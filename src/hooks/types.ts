import { CSSProperties } from 'react';

export interface ControllerHookOptions {
  controllerId?: string;
}

export interface DualAxisOptions {
  horizontalAxisId?: string;
  verticalAxisId?: string;
}

export interface RectangleOptions {
  color?: CSSProperties['stroke'];
  style?: CSSProperties;
}
export interface PathOptions {
  color?: CSSProperties['stroke' | 'color'];
  style?: CSSProperties;
}
