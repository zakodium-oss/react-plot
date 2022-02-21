import { CSSProperties, useEffect } from 'react';
import { useBBoxObserver, AlignGroup } from 'react-d3-utils';

import {
  usePlotContext,
  usePlotDispatchContext,
} from '../contexts/plotContext';
import type { VerticalPosition } from '../types';

export interface HeadingProps {
  title: string;
  titleStyle?: CSSProperties;
  titleClass?: string;
  subtitle?: string;
  subtitleStyle?: CSSProperties;
  subtitleClass?: string;
  position?: VerticalPosition;
}

export function Heading({
  title,
  titleStyle,
  titleClass,
  subtitle,
  subtitleStyle,
  subtitleClass,
  position = 'top',
}: HeadingProps) {
  const { width, height } = usePlotContext();

  const dispatch = usePlotDispatchContext();

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
  useEffect(() => {
    dispatch({ type: 'addHeading', payload: { position } });
    // Delete information on unmount
    return () => dispatch({ type: 'removeHeading' });
  }, [dispatch, position]);
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
          transform={`translate(0, ${headingBbox.height})`}
          style={{
            ...defaultSubtitleStyle,
            ...subtitleStyle,
          }}
          className={subtitleClass}
        >
          {subtitle}
        </text>
      )}
    </AlignGroup>
  );
}

Heading.defaultProps = {
  position: 'top',
};
