import { CSSProperties } from 'react';

export interface DualAxisOptions {
  horizontalAxisId?: string;
  verticalAxisId?: string;
}

export interface RectangleOptions {
  color?: CSSProperties['stroke'];
  style?: CSSProperties;
}
export interface PathOptions {
  color?: CSSProperties['stroke'];
  style?: CSSProperties;
}
