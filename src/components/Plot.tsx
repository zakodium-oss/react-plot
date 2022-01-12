import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import { CSSProperties, ReactNode, Reducer, useMemo, useReducer } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../bboxContext';
import { LegendProvider } from '../legendContext';
import {
  plotContext,
  plotDispatchContext,
  plotReducer,
  PlotReducerActions,
  PlotState,
  useAxisContext,
} from '../plotContext';
import type { Margins } from '../types';
import { splitChildren } from '../utils/splitChildren';

import MarkerDefs from './Annotations/MarkerDefs';
import Tracking, { TrackingResult } from './Tracking';
import TransparentRect from './TransparentRect';

const reducerCurr: Reducer<PlotState, PlotReducerActions> =
  produce(plotReducer);
const initialState: PlotState = {
  series: [],
  axis: {},
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
   * Mouse enters the viewport.
   */
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  /**
   * Mouse leaves the viewport.
   */
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
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
    children,
  } = props;

  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const {
    seriesAndAnnotations,
    topAxis,
    rightAxis,
    bottomAxis,
    leftAxis,
    topHeading,
    bottomHeading,
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

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;

  const plotWidth =
    width - left - leftAxisBbox.width - right - rightAxisBbox.width;
  const plotHeight =
    height -
    top -
    headingBbox.height -
    topAxisBbox.height -
    bottom -
    bottomAxisBbox.height;

  const leftOffset = left + leftAxisBbox.width;
  const topOffset =
    top + (topHeading ? headingBbox.height : 0) + topAxisBbox.height;

  // Set scales
  const axisContext = useAxisContext(state, { plotWidth, plotHeight });

  const labels = useMemo(
    () => state.series.map(({ id, label }) => ({ id, label })),
    [state.series],
  );

  const ids = useMemo(() => state.series.map(({ id }) => id), [state.series]);

  const colorScaler = useMemo(() => {
    return scaleOrdinal<string>().range(colorScheme).domain(ids);
  }, [colorScheme, ids]);

  return (
    <plotContext.Provider
      value={{
        width,
        height,
        left,
        right,
        top,
        bottom,
        plotWidth,
        plotHeight,
        labels,
        colorScaler,
        axisContext,
      }}
    >
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
            <MarkerDefs />

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

              {legend}

              {onClick || onMouseMove ? (
                <Tracking
                  stateSeries={state.series}
                  onClick={(position) => onClick?.(position)}
                  onMouseMove={(position) => onMouseMove?.(position)}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                />
              ) : null}
            </g>

            <g ref={headingBbox.ref}>{topHeading || bottomHeading}</g>
          </svg>
        </LegendProvider>
      </plotDispatchContext.Provider>
    </plotContext.Provider>
  );
}
