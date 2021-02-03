import { CSSProperties, useEffect } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { HeadingProps } from '../types';

export default function Heading({
  title,
  titleStyle,
  titleClass,
  subtitle,
  subtitleStyle,
  subtitleClass,
  position = 'top',
}: HeadingProps) {
  const { width } = usePlotContext();
  const { dispatch } = useDispatchContext();

  useEffect(() => dispatch({ type: 'setHeadingPosition', payload: position }), [
    dispatch,
    position,
  ]);

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

  return (
    <g transform={`translate(${width / 2}, 0)`}>
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
