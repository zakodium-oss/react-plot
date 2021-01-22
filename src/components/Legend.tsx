/* eslint-disable react/no-array-index-key */
import React, { Fragment, useMemo } from 'react';

import { usePlotContext } from '../hooks';
import type { Horizontal, LegendProps, Vertical } from '../types';

import { Circle, Square, Triangle } from './Markers';
import { useLegend } from './legendsContext';

type Positions = { [K in Vertical | Horizontal]?: number };
interface ValidatedPosition {
  key?: Vertical | Horizontal;
  value?: number;
}
export function exclusiveProps(
  margins: Positions,
  a: keyof Positions,
  b: keyof Positions,
  position: string,
): ValidatedPosition {
  if (margins[a] !== undefined) {
    if (margins[b] !== undefined) {
      throw new Error(
        `${a} and ${b} should't be both defined for the position ${position}`,
      );
    }
    return { key: a, value: margins[a] };
  }
  return margins[b] !== undefined ? { key: b, value: margins[b] } : {};
}

function translation(
  position: Horizontal | Vertical | 'embedded',
  legendMargins: Positions,
  plotMargins: Required<Positions>,
  width: number,
  height: number,
) {
  const plotHeight = height - plotMargins.top - plotMargins.bottom;
  const plotWidth = width - plotMargins.left - plotMargins.right;
  switch (position) {
    case 'embedded': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = 10,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const {
        key: horizontalKey = 'left',
        value: horizontalValue = 10,
      } = exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right - horizontalValue
          : plotMargins.left + horizontalValue;
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      return [x, y];
    }
    case 'top': {
      const {
        key: horizontalKey = 'left',
        value: horizontalValue = plotWidth / 2,
      } = exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right + horizontalValue
          : plotMargins.left + horizontalValue;
      const y = plotMargins.top - (legendMargins.bottom || 50);
      return [x, y];
    }
    case 'bottom': {
      const {
        key: horizontalKey = 'left',
        value: horizontalValue = plotWidth / 2,
      } = exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right + horizontalValue
          : plotMargins.left + horizontalValue;
      const y = height - plotMargins.bottom + (legendMargins.top || 25);
      return [x, y];
    }
    case 'left': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      const x = plotMargins.left - (legendMargins.right || 100);
      return [x, y];
    }
    case 'right': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      const x = width - plotMargins.right + (legendMargins.left || 40);
      return [x, y];
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export default function Legend({ position, ...legendMargins }: LegendProps) {
  const { right, left, top, bottom, height, width } = usePlotContext();
  const [state] = useLegend();

  const [x, y] = useMemo(() => {
    const plotMargins = { right, left, top, bottom };
    return translation(position, legendMargins, plotMargins, width, height);
  }, [position, legendMargins, right, left, top, bottom, width, height]);

  return (
    <g className="legend" transform={`translate(${x}, ${y})`}>
      {state.labels.map((value, index) => (
        <Fragment key={`${value.color}-${value.label}`}>
          {getShape(value.shape, { color: value.color, index })}

          <text
            key={`text-${value.label}-${index}`}
            x={`${0.75 + 0.5}em`}
            y={`${index + 1}em`}
          >
            {value.label}
          </text>
        </Fragment>
      ))}
    </g>
  );
}

function getShape(shape: string, config: { index: number; color: string }) {
  const x = 5;
  const y = (config.index + 1) * 16 - x;

  switch (shape) {
    case 'circle': {
      return <Circle x={x} y={y} size={5} style={{ fill: config.color }} />;
    }
    case 'square': {
      return <Square x={x} y={y} size={5} style={{ fill: config.color }} />;
    }
    case 'triangle': {
      return <Triangle x={x} y={y} size={5} style={{ fill: config.color }} />;
    }
    default:
      throw new Error('unreachable');
  }
}
