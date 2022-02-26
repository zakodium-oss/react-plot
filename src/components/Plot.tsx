import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import {
  CSSProperties,
  ReactNode,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
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
import {
  usePlotEventsPlotContext,
  usePlotOverrides,
} from '../contexts/plotController/plotControllerContext';
import type { Margins } from '../types';
import { useId } from '../utils';
import { splitChildren } from '../utils/splitChildren';
import { usePlotSizes } from '../utils/usePlotSizes';

import Tracking from './Tracking';
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
  userSelect: 'none',
  // Without this, Safari on iOS still triggers selection from a long press.
  WebkitUserSelect: 'none',
};

const defaultEventSvgStyle: CSSProperties = {
  // Prevent default touch behavior on the plot only when events are enabled.
  touchAction: 'none',
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
   * Id of the parent PlotController that will control this plot.
   */
  controllerId?: string;
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
    controllerId,
    children,
  } = props;

  const plotId = useId(undefined, 'plot');
  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const {
    series,
    annotations,
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

  const plotEvents = usePlotEventsPlotContext({ controllerId });
  useEffect(() => {
    if (!plotEvents) return;
    plotEvents.registerPlot(plotId);
    return () => plotEvents.unregisterPlot(plotId);
  }, [plotEvents, plotId]);

  const plotOverrides = usePlotOverrides({ controllerId });

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
  const axisContext = useAxisContext(state, plotOverrides.axes, {
    plotWidth,
    plotHeight,
  });

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

  const finalSvgStyle: CSSProperties = {
    ...defaultSvgStyle,
    ...(plotEvents ? defaultEventSvgStyle : null),
    ...svgStyle,
  };

  return (
    <plotContext.Provider value={plotContextValue}>
      <plotDispatchContext.Provider value={dispatch}>
        <LegendProvider>
          <div style={{ position: 'relative', width: width, height: height }}>
            {/* Annottions & Tracking layer */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              style={{
                ...finalSvgStyle,
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '10',
              }}
              id={svgId ? `${svgId}-2` : undefined}
              className={svgClassName}
            >
              <g transform={`translate(${leftOffset}, ${topOffset})`}>
                <g style={{ clipPath: `url(#seriesViewportClip-${plotId})` }}>
                  {annotations}
                </g>
                {plotEvents ? (
                  <Tracking
                    plotId={plotId}
                    plotEvents={plotEvents}
                    stateSeries={state.series}
                    axisContext={axisContext}
                    plotWidth={plotWidth}
                    plotHeight={plotHeight}
                  />
                ) : null}
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              style={{
                ...finalSvgStyle,
                position: 'absolute',
                top: '0',
                left: '0',
              }}
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
                <clipPath id={`seriesViewportClip-${plotId}`}>
                  <rect width={plotWidth} height={plotHeight} />
                </clipPath>

                <g style={{ clipPath: `url(#seriesViewportClip-${plotId})` }}>
                  {series}
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
              </g>

              <g ref={headingBbox.ref}>{heading}</g>
            </svg>
          </div>
        </LegendProvider>
      </plotDispatchContext.Provider>
    </plotContext.Provider>
  );
}
