import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import type { CSSProperties, ReactNode, Reducer } from 'react';
import { useEffect, useMemo, useReducer } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { LegendProvider } from '../contexts/legendContext.provider.js';
import type {
  PlotContext,
  PlotReducerActions,
  PlotState,
} from '../contexts/plotContext.js';
import {
  plotContext,
  plotDispatchContext,
  plotReducer,
  useAxisContext,
} from '../contexts/plotContext.js';
import {
  usePlotEventsPlotContext,
  usePlotOverrides,
} from '../contexts/plotController/plotControllerContext.js';
import type { Margins } from '../types.js';
import { splitChildren } from '../utils/splitChildren.js';
import { usePlotSizes } from '../utils/usePlotSizes.js';
import { useId } from '../utils.js';

import Tracking from './Tracking.js';
import AnnotationsTrackingLayer from './layers/AnnotationsTrackingLayer.js';
import MainLayer from './layers/MainLayer.js';

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
  const [state, dispatch] = useReducer(reducerCurr, initialState);

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
    position: 'absolute',
    top: '0',
    left: '0',
  };

  return (
    <plotContext.Provider value={plotContextValue}>
      <plotDispatchContext.Provider value={dispatch}>
        <LegendProvider>
          <div style={{ position: 'relative', width, height }}>
            <MainLayer
              width={width}
              height={height}
              svgStyle={finalSvgStyle}
              svgId={svgId}
              svgClassName={svgClassName}
              plotViewportStyle={plotViewportStyle}
              seriesViewportStyle={seriesViewportStyle}
              topOffset={topOffset}
              leftOffset={leftOffset}
              plotWidth={plotWidth}
              plotHeight={plotHeight}
              plotId={plotId}
              series={series}
              topAxisRef={topAxisBbox.ref}
              topAxis={topAxis}
              rightAxisRef={rightAxisBbox.ref}
              rightAxis={rightAxis}
              bottomAxisRef={bottomAxisBbox.ref}
              bottomAxis={bottomAxis}
              leftAxisRef={leftAxisBbox.ref}
              leftAxis={leftAxis}
              headingRef={headingBbox.ref}
              heading={heading}
            />
            <AnnotationsTrackingLayer
              width={width}
              height={height}
              svgStyle={finalSvgStyle}
              svgId={svgId}
              svgClassName={svgClassName}
              topOffset={topOffset}
              leftOffset={leftOffset}
              legendOffset={legendOffset}
              legend={legend}
              legendRef={legendBbox.ref}
              plotId={plotId}
              annotations={annotations}
              tracking={
                plotEvents ? (
                  <Tracking
                    plotId={plotId}
                    plotEvents={plotEvents}
                    stateSeries={state.series}
                    axisContext={axisContext}
                    plotWidth={plotWidth}
                    plotHeight={plotHeight}
                  />
                ) : null
              }
            />
          </div>
        </LegendProvider>
      </plotDispatchContext.Provider>
    </plotContext.Provider>
  );
}
