import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import { CSSProperties, Reducer, useMemo, useReducer } from 'react';

import TransparentRect from './components/TransparentRect';
import { LegendProvider } from './components/legendsContext';
import {
  PlotContext,
  DispatchContext,
  useAxisContext,
  useMeasuredGroup,
} from './hooks';
import { plotReducer } from './plotReducer';
import type { PlotProps, PlotReducerActions, PlotState } from './types';
import { splitChildren } from './utils';

const reducerCurr: Reducer<PlotState, PlotReducerActions> = produce(
  plotReducer,
);
const initialState: PlotState = {
  series: [],
  axis: {},
  headingPosition: 'top',
};

const defaultSvgStyle: CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  dominantBaseline: 'text-before-edge',
};

export type { PlotProps };

/**
 * Static plot with fixed dimensions.
 */
export default function Plot(props: PlotProps) {
  const {
    width,
    height,
    colorScheme = schemeSet1,
    svgStyle = {},
    plotViewportStyle = {},
    seriesViewportStyle = {},
    children,
  } = props;

  let {
    margin: {
      left: marginLeft = 0,
      right: marginRight = 0,
      top: marginTop = 'auto' as const,
      bottom: marginBottom = 'auto' as const,
    },
  } = props;

  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const { hasInvalidChild, series, axes, heading, legend } = splitChildren(
    children,
  );
  if (hasInvalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }
  if ([width, height].includes(undefined)) {
    throw new Error('Width and height are mandatory');
  }

  const labels = useMemo(
    () => state.series.map(({ id, label }) => ({ id, label })),
    [state.series],
  );

  const ids = useMemo(() => state.series.map(({ id }) => id), [state.series]);

  const colorScaler = useMemo(() => {
    return scaleOrdinal<string>().range(colorScheme).domain(ids);
  }, [colorScheme, ids]);

  const headingRef = useMeasuredGroup();
  const headingElement = heading ? <g ref={headingRef.ref}>{heading}</g> : null;

  if (marginTop === 'auto') {
    marginTop = 0;
    if (state.headingPosition === 'top') {
      marginTop += headingRef.height;
    }
  }

  if (marginBottom === 'auto') {
    marginBottom = 0;
    if (state.headingPosition === 'bottom') {
      marginBottom += headingRef.height;
    }
  }

  // Distances in plot
  const plotWidth = width - marginLeft - marginRight;
  const plotHeight = height - marginTop - marginBottom;

  // Set scales
  const axisContext = useAxisContext(state, {
    plotWidth,
    plotHeight,
  });

  return (
    <PlotContext.Provider
      value={{
        width,
        height,
        left: marginLeft,
        right: marginRight,
        top: marginTop,
        bottom: marginBottom,
        plotWidth,
        plotHeight,
        labels,
        colorScaler,
        axisContext,
      }}
    >
      <DispatchContext.Provider value={{ dispatch }}>
        <LegendProvider>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            style={{ ...defaultSvgStyle, ...svgStyle }}
          >
            {/* Plot viewport */}
            <TransparentRect
              width={width}
              height={height}
              style={plotViewportStyle}
            />

            {/* Series viewport */}
            <g transform={`translate(${marginLeft}, ${marginTop})`}>
              <TransparentRect
                width={plotWidth}
                height={plotHeight}
                style={seriesViewportStyle}
              />

              {/* Prevents the chart from being drawn outside of the viewport */}
              <clipPath id="seriesViewportClip">
                <rect width={plotWidth} height={plotHeight} />
              </clipPath>

              <g style={{ clipPath: 'url(#seriesViewportClip)' }}>{series}</g>

              {axes}
            </g>

            {/* Top */}
            <g>{state.headingPosition === 'top' ? headingElement : null}</g>

            {/* Right */}
            <g />

            {/* Bottom */}
            <g transform={`translate(0, ${marginTop + plotHeight})`}>
              {state.headingPosition === 'bottom' ? headingElement : null}
            </g>

            {/* Left */}
            <g />

            {legend}
          </svg>
        </LegendProvider>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}
