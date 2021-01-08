/* eslint-disable react/no-array-index-key */
import React from 'react';

import { usePlotContext } from '../hooks';
import type { Horizontal, LegendProps } from '../types';

function translation(
  position: Horizontal,
  width: number,
  height: number,
  right: number,
  left: number,
  space?: number,
) {
  switch (position) {
    case 'right': {
      const border = space === undefined ? 16 : space;
      return [width - right + border, height / 2];
    }
    case 'left': {
      const border = space === undefined ? 130 : space;
      return [left - border, height / 2];
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export default function Legend({ position, space }: LegendProps) {
  const { labels, right, left, height, width, colorScaler } = usePlotContext();
  const [x, y] = translation(position, width, height, right, left, space);
  return (
    <g transform={`translate(${x}, ${y})`}>
      {labels?.map(({ id }, index) => (
        <circle
          key={`circle-${id}-${index}`}
          cx="0"
          cy={`${index + 1}em`}
          r="0.25em"
          fill={colorScaler(id)}
        />
      ))}
      {labels?.map(({ label }, index) => (
        <text key={`text-${label}-${index}`} x="0.75em" y={`${index + 1.25}em`}>
          {label}
        </text>
      ))}
    </g>
  );
}
