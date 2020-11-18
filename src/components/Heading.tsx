import React, { CSSProperties } from 'react';

import { usePlotContext } from '../hooks';
import type { HeadingProps } from '../types';

function yTranslation(position: 'top' | 'bottom', height: number) {
  switch (position) {
    case 'top': {
      return 20;
    }
    case 'bottom': {
      return height + 64;
    }
    default: {
      throw new Error(`Unknown ${JSON.stringify(position)} position`);
    }
  }
}

export default function Heading({
  title,
  titleStyle,
  titleClass,
  subtitle,
  subtitleStyle,
  subtitleClass,
  position = 'top',
}: HeadingProps) {
  const { width, height, margin } = usePlotContext();

  const defaultTitleStyle: CSSProperties = {
    textAnchor: 'middle',
    fontSize: '16px',
    fontWeight: 'bold',
  };
  const defaultSubtitleStyle: CSSProperties = {
    textAnchor: 'middle',
    fontSize: '14px',
    color: 'gray',
  };

  const bottomHeigth = height - (margin.bottom || 0);
  const y = yTranslation(position, bottomHeigth);
  return (
    <g transform={`translate(${width / 2}, ${y})`}>
      <text
        style={{ ...defaultTitleStyle, ...titleStyle }}
        className={titleClass}
      >
        {title}
      </text>
      {subtitle && (
        <text
          transform="translate(0, 20)"
          style={{ ...defaultSubtitleStyle, ...subtitleStyle }}
          className={subtitleClass}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}
