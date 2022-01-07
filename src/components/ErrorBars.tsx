import { useMemo, SVGAttributes } from 'react';

import { usePlotContext } from '../hooks';
import type { SeriesPoint } from '../types';
import { validateAxis, validateSeriesPointError } from '../utils';

export interface ErrorBarsProps {
  data: SeriesPoint[];
  xAxis?: string;
  yAxis?: string;
  hidden?: boolean;
  style?: SVGAttributes<SVGLineElement>;
  capSize?: number;
  capStyle?: SVGAttributes<SVGLineElement>;
}

interface PointBarsProps {
  origin: { x: number; y: number };
  top: number | null;
  bottom: number | null;
  left: number | null;
  right: number | null;
  style?: SVGAttributes<SVGLineElement>;
  capSize?: number;
  capStyle?: SVGAttributes<SVGLineElement>;
}

export default function ErrorBars(props: ErrorBarsProps) {
  const { xAxis = 'x', yAxis = 'y', data, hidden, ...otherProps } = props;
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  const points = useMemo(() => {
    if (hidden) return null;
    if (xScale === undefined || yScale === undefined) {
      return null;
    }

    const pointBars = data.map((point, i) => {
      const xError = validateSeriesPointError(point.xError);
      const yError = validateSeriesPointError(point.yError);
      return (
        <PointBars // eslint-disable-next-line react/no-array-index-key
          key={`ErrorBars-${i}`}
          origin={{ x: xScale(point.x), y: yScale(point.y) }}
          bottom={yError ? yScale(point.y - yError[0]) : null}
          top={yError ? yScale(point.y + yError[1]) : null}
          left={xError ? xScale(point.x - xError[0]) : null}
          right={xError ? xScale(point.x + xError[1]) : null}
          {...otherProps}
        />
      );
    });
    return pointBars;
  }, [data, xScale, yScale, hidden, otherProps]);
  return <g>{points}</g>;
}

function PointBars(props: PointBarsProps) {
  const {
    origin,
    top,
    bottom,
    left,
    right,
    style,
    capSize = 10,
    capStyle,
  } = props;
  const defaultColor = 'black';

  return (
    <g>
      {top != null && (
        <g>
          <line
            x1={origin.x}
            x2={origin.x}
            y1={origin.y}
            y2={top}
            stroke={defaultColor}
            {...style}
          />
          <line
            x1={origin.x - capSize / 2}
            x2={origin.x + capSize / 2}
            y1={top}
            y2={top}
            stroke={defaultColor}
            {...style}
            {...capStyle}
          />
        </g>
      )}

      {bottom != null && (
        <g>
          <line
            x1={origin.x}
            x2={origin.x}
            y1={origin.y}
            y2={bottom}
            stroke={defaultColor}
            {...style}
          />
          <line
            x1={origin.x - capSize / 2}
            x2={origin.x + capSize / 2}
            y1={bottom}
            y2={bottom}
            stroke={defaultColor}
            {...style}
            {...capStyle}
          />
        </g>
      )}

      {left != null && (
        <g>
          <line
            x1={origin.x}
            x2={left}
            y1={origin.y}
            y2={origin.y}
            stroke={defaultColor}
            {...style}
          />
          <line
            x1={left}
            x2={left}
            y1={origin.y - capSize / 2}
            y2={origin.y + capSize / 2}
            stroke={defaultColor}
            {...style}
            {...capStyle}
          />
        </g>
      )}

      {right != null && (
        <g>
          <line
            x1={origin.x}
            x2={right}
            y1={origin.y}
            y2={origin.y}
            stroke={defaultColor}
            {...style}
          />
          <line
            x1={right}
            x2={right}
            y1={origin.y - capSize / 2}
            y2={origin.y + capSize / 2}
            stroke={defaultColor}
            {...style}
            {...capStyle}
          />
        </g>
      )}
    </g>
  );
}
