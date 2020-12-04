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
) {
  switch (position) {
    case 'right': {
      return [width - right + 16, height / 2];
    }
    case 'left': {
      return [left - 130, height / 2];
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export default function Legend({ position }: LegendProps) {
  const { labels, right, left, height, width, colorScaler } = usePlotContext();
  const [x, y] = translation(position, width, height, right, left);
  return (
    <g transform={`translate(${x}, ${y})`}>
      {labels?.map((text, index) => (
        <circle
          key={`circle-${text}-${index}`}
          cx="0"
          cy={`${index + 1}em`}
          r="0.25em"
          fill={colorScaler(text)}
        />
      ))}
      {labels?.map((text, index) => (
        <text key={`text-${text}-${index}`} x="0.75em" y={`${index + 1.25}em`}>
          {text}
        </text>
      ))}
    </g>
  );
}
