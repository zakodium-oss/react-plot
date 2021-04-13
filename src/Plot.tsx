import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import { CSSProperties, Reducer, useMemo, useReducer } from 'react';

import MarkerDefs from './components/Annotations/MarkerDefs';
import Tracking, { closestCalculation } from './components/Tracking';
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
    closest,
    children,
  } = props;

  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const {
    hasInvalidChild,
    series,
    axes,
    heading,
    legend,
    annotations,
  } = splitChildren(children);

  if (hasInvalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }
  if ([width, height].includes(undefined)) {
    throw new Error('Width and height are mandatory');
  }

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  // Set scales
  const axisContext = useAxisContext(state, {
    plotWidth,
    plotHeight,
  });

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
            <g transform={`translate(${left}, ${top})`}>
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
                {series}
                {annotations}
              </g>

              {axes}

              {onClick || onMouseMove ? (
                <Tracking
                  onClick={(position) => {
                    onClick?.(
                      closestCalculation(
                        position,
                        closest,
                        state.series,
                        axisContext,
                      ),
                    );
                  }}
                  onMouseMove={(position) => {
                    onMouseMove?.(
                      closestCalculation(
                        position,
                        closest,
                        state.series,
                        axisContext,
                      ),
                    );
                  }}
                />
              ) : null}
            </g>

            {heading}
            {legend}
          </svg>
        </LegendProvider>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}
