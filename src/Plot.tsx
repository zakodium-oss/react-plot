import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import { CSSProperties, Reducer, useMemo, useReducer } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import MarkerDefs from './components/Annotations/MarkerDefs';
import Tracking from './components/Tracking';
import TransparentRect from './components/TransparentRect';
import { LegendProvider } from './components/legendsContext';
import { PlotContext, DispatchContext, useAxisContext } from './hooks';
import { reducer } from './plotReducer';
import type { PlotProps, ReducerActions, State } from './types';
import { splitChildren } from './utils';

const reducerCurr: Reducer<State, ReducerActions> = produce(reducer);
const initialState: State = {
  series: [],
  axis: {},
};

const defaultSvgStyle: CSSProperties = {
  fontFamily: 'Arial, Helvetica, sans-serif',
};

export type { PlotProps };

/**
 * Static plot with fixed dimension.
 */
export default function Plot(props: PlotProps) {
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
    onClick,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    children,
  } = props;

  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const { seriesAndAnnotations, axes, heading, legend } = splitChildren(
    children,
  );

  if ([width, height].includes(undefined)) {
    throw new Error('Width and height are mandatory');
  }

  const headingBbox = useBBoxObserver();
  const headingHeight = headingBbox.height;
  const headingPosition: 'top' | 'bottom' | null = heading
    ? heading.props.position || 'top'
    : null;

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom - headingHeight;

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
    <PlotContext.Provider
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
      <DispatchContext.Provider value={{ dispatch }}>
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
            <g
              transform={`translate(${left}, ${
                top + (headingPosition === 'top' ? headingHeight : 0)
              })`}
            >
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

              {axes}

              {onClick || onMouseMove ? (
                <Tracking
                  stateSeries={state.series}
                  onClick={(position) => onClick?.(position)}
                  onMouseMove={(position) => onMouseMove?.(position)}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              ) : null}
            </g>

            <g ref={headingBbox.ref}>{heading}</g>
            {legend}
          </svg>
        </LegendProvider>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}
