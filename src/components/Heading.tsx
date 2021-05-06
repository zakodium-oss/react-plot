import { CSSProperties } from 'react';
import { useBBoxObserver, AlignGroup } from 'react-d3-utils';

import { usePlotContext } from '../hooks';
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
  const { width, height } = usePlotContext();

  const defaultTitleStyle: CSSProperties = {
    dominantBaseline: 'hanging',
    textAnchor: 'middle',
    fontSize: '16px',
    fontWeight: 'bold',
  };
  const defaultSubtitleStyle: CSSProperties = {
    dominantBaseline: 'hanging',
    textAnchor: 'middle',
    fontSize: '14px',
    color: 'gray',
  };

  const headingBbox = useBBoxObserver();

  return (
    <AlignGroup
      x={width / 2}
      y={position === 'top' ? 0 : height}
      horizontalAlign="middle"
      verticalAlign={position === 'top' ? 'start' : 'end'}
    >
      <text
        ref={headingBbox.ref}
        style={{ ...defaultTitleStyle, ...titleStyle }}
        className={titleClass}
      >
        {title}
      </text>
      {subtitle && (
        <text
          style={{
            ...defaultSubtitleStyle,
            ...subtitleStyle,
            transform: `translateY(${headingBbox.height}px)`,
          }}
          className={subtitleClass}
        >
          {subtitle}
        </text>
      )}
    </AlignGroup>
  );
}
