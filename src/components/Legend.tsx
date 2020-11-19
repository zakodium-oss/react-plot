/* eslint-disable react/no-array-index-key */
import React from 'react';

import { usePlotContext } from '../hooks';
import type { LegendProps } from '../types';

export default function Legend({ position, direction }: LegendProps) {
  const { labels, margin, height, width } = usePlotContext();
  return (
    <g
      transform={`translate(${width - (margin.right || 0) + 10},${height / 2})`}
    >
      {labels?.map((text, i) => (
        <circle
          key={`circle-${text}-${i}`}
          cx="0"
          cy={`${i + 1}em`}
          r="0.25em"
          fill="blue"
        />
      ))}
      {labels?.map((text, i) => (
        <text key={`text-${text}-${i}`} x="0.75em" y={`${i + 1.25}em`}>
          {text}
        </text>
      ))}
    </g>
  );
}
