import { CSSProperties } from 'react';

export interface ControllerHookOptions {
  controllerId?: string;
}

export interface DualAxisOptions {
  /**
   * id of the horizontal axis
   * @default 'x'
   * */
  horizontalAxisId?: string;
  /**
   * id of the vertical axis
   * @default 'y'
   * */
  verticalAxisId?: string;
}

export interface RectangleOptions {
  /**
   * Rectangle stroke color
   * @default 'red'
   * */
  color?: CSSProperties['stroke'];
  /**
   * Rectangle style
   * */
  style?: CSSProperties;
}
export interface PathOptions {
  /**
   * Path line color
   * @default 'black'
   * */
  color?: CSSProperties['stroke' | 'fill'];
  /**
   * Path line style
   * */
  style?: CSSProperties;
}
