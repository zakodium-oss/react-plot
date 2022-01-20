import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import { CSSProperties, ReactNode, Reducer, useMemo, useReducer } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../contexts/bboxContext';
import { LegendProvider } from '../contexts/legendContext';
import { legendOffsetContext } from '../contexts/legendOffsetContext';
import {
  PlotContext,
  plotContext,
  plotDispatchContext,
  plotReducer,
  PlotReducerActions,
  PlotState,
  useAxisContext,
} from '../contexts/plotContext';
import type { Margins } from '../types';
import { splitChildren } from '../utils/splitChildren';
import { usePlotSizes } from '../utils/usePlotSizes';

import Tracking, { TrackingResult } from './Tracking';
import TransparentRect from './TransparentRect';

const reducerCurr: Reducer<PlotState, PlotReducerActions> =
  produce(plotReducer);
const initialState: PlotState = {
  headingPosition: null,
  legendPosition: null,
  legendMargin: 0,
  series: [],
  axes: {},
};

const defaultSvgStyle: CSSProperties = {
  overflow: 'visible',
  fontFamily: 'Arial, Helvetica, sans-serif',
};

export interface PlotProps {
  /**
   * Width of the SVG in pixels.
   */
  width: number;
  /**
   * Height of the SVG in pixels.
   */
  height: number;
  /**
   * Color scheme used to pick colors for the series.
   * Defaults to the "schemeSet1" from "d3-scale-chromatic".
   */
  colorScheme?: Iterable<string>;
  /**
   * Margins around the plot.
   */
  margin?: Partial<Margins>;
  /**
   * Style applied to the SVG element.
   */
  svgStyle?: CSSProperties;
  /**
   * Id of the SVG element.
   */
  svgId?: string;
  /**
   * Class name of the SVG element.
   */
  svgClassName?: string;
  /**
   * Style applied to the rectangle around the entire plot.
   */
  plotViewportStyle?: CSSProperties;
  /**
   * Style applied to the rectangle around the series viewport.
   */
  seriesViewportStyle?: CSSProperties;
  /**
   * Track values on mouse move.
   */
  onMouseMove?: (result: TrackingResult) => void;
  /**
   * Track values on mouse click.
   */
  onClick?: (result: TrackingResult) => void;

  /**
   * Track values on mouse Up.
   */
  onMouseUp?: (result: TrackingResult) => void;

  /**
   * Track values on mouse Down.
   */
  onMouseDown?: (result: TrackingResult) => void;

  /**
   * Track values on mouse double click.
   */
  onDoubleClick?: (result: TrackingResult) => void;
  /**
   * Track values on wheel inside the viewport.
   */
  onWheel?: (event: TrackingResult) => void;
  /**
   * Mouse enters the viewport.
   */
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  /**
   * Mouse leaves the viewport.
   */
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  /**
   *  Track values on click Keyboard key.
   */
  onKeyPress?: (event: React.KeyboardEvent<SVGRectElement>) => void;
  /**
   * Track values on keyboard key Down.
   */
  onKeyDown?: (event: React.KeyboardEvent<SVGRectElement>) => void;
  /**
   * Track values on keyboard key Up.
   */
  onKeyUp?: (event: React.KeyboardEvent<SVGRectElement>) => void;
  /**
   * All plot elements.
   */
  children: ReactNode;
}

export function Plot(props: PlotProps) {
  const {
    width,
    height,
    colorScheme = schemeSet1,
    margin = {},
    svgStyle = {},
    svgId,
    svgClassName,
    plotViewportStyle = {},
    seriesViewportStyle = {},
    onMouseMove,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onDoubleClick,
    onWheel,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    children,
  } = props;

  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const {
    seriesAndAnnotations,
    topAxis,
    rightAxis,
    bottomAxis,
    leftAxis,
    heading,
    legend,
  } = splitChildren(children);

  if (width === undefined) {
    throw new Error('width is mandatory');
  }
  if (height === undefined) {
    throw new Error('height is mandatory');
  }

  // Bounding boxes used to adapt viewport size.
  const headingBbox = useBBoxObserver();
  const topAxisBbox = useBBoxObserver();
  const rightAxisBbox = useBBoxObserver();
  const bottomAxisBbox = useBBoxObserver();
  const leftAxisBbox = useBBoxObserver();
  const legendBbox = useBBoxObserver();

  // Distances in plot.
  const { plotWidth, plotHeight, topOffset, leftOffset, legendOffset } =
    usePlotSizes({
      width,
      height,
      margin,
      axes: state.axes,
      topAxisHeight: topAxisBbox.height,
      rightAxisWidth: rightAxisBbox.width,
      bottomAxisHeight: bottomAxisBbox.height,
      leftAxisWidth: leftAxisBbox.width,
      headingPosition: state.headingPosition,
      headingHeight: headingBbox.height,
      legendPosition: state.legendPosition,
      legendMargin: state.legendMargin,
      legendWidth: legendBbox.width,
      legendHeight: legendBbox.height,
    });

  // Set scales.
  const axisContext = useAxisContext(state, { plotWidth, plotHeight });

  const ids = useMemo(() => state.series.map(({ id }) => id), [state.series]);
  const colorScaler = useMemo(
    () => scaleOrdinal<string>().range(colorScheme).domain(ids),
    [colorScheme, ids],
  );

  const plotContextValue: PlotContext = useMemo(() => {
    return {
      width,
      height,
      plotWidth,
      plotHeight,
      axisContext,
      colorScaler,
    };
  }, [width, height, plotWidth, plotHeight, axisContext, colorScaler]);

  return (
    <plotContext.Provider value={plotContextValue}>
      <plotDispatchContext.Provider value={dispatch}>
        <LegendProvider>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            style={{ ...defaultSvgStyle, ...svgStyle }}
            id={svgId}
            className={svgClassName}
          >
            {/* Plot viewport */}
            <TransparentRect
              width={width}
              height={height}
              style={plotViewportStyle}
            />

            {/* Series viewport */}
            <g transform={`translate(${leftOffset}, ${topOffset})`}>
              <TransparentRect
                width={plotWidth}
                height={plotHeight}
                style={seriesViewportStyle}
              />

              {/* Prevents the chart from being drawn outside of the viewport */}
              <clipPath id="seriesViewportClip">
                <rect width={plotWidth} height={plotHeight} />
              </clipPath>

              <g style={{ clipPath: 'url(#seriesViewportClip)' }}>
                {seriesAndAnnotations}
              </g>

              <bboxContext.Provider value={topAxisBbox.ref}>
                <g>{topAxis}</g>
              </bboxContext.Provider>

              <bboxContext.Provider value={rightAxisBbox.ref}>
                <g>{rightAxis}</g>
              </bboxContext.Provider>

              <bboxContext.Provider value={bottomAxisBbox.ref}>
                <g>{bottomAxis}</g>
              </bboxContext.Provider>

              <bboxContext.Provider value={leftAxisBbox.ref}>
                <g>{leftAxis}</g>
              </bboxContext.Provider>

              <legendOffsetContext.Provider value={legendOffset}>
                <g ref={legendBbox.ref}>{legend}</g>
              </legendOffsetContext.Provider>

              {onClick ||
              onMouseMove ||
              onMouseUp ||
              onMouseDown ||
              onDoubleClick ||
              onWheel ||
              onKeyPress ||
              onKeyDown ? (
                <Tracking
                  stateSeries={state.series}
                  onClick={(position) => onClick?.(position)}
                  onMouseMove={(position) => onMouseMove?.(position)}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onDoubleClick={onDoubleClick}
                  onWheel={onWheel}
                  onKeyPress={onKeyPress}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                />
              ) : null}
            </g>

            <g ref={headingBbox.ref}>{heading}</g>
          </svg>
        </LegendProvider>
      </plotDispatchContext.Provider>
    </plotContext.Provider>
  );
}
