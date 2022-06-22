import { CSSProperties } from 'react';

export interface ControllerHookOptions {
  controllerId?: string;
}

export interface DualAxisOptions {
  /**
   * Id of the horizontal axis.
   * @defaultValue 'x'
   * */
  horizontalAxisId?: string;
  /**
   * Id of the vertical axis.
   * @defaultValue 'y'
   * */
  verticalAxisId?: string;
}

export interface RectangleOptions {
  /**
   * Rectangle stroke color.
   * @defaultValue 'red'
   * */
  color?: CSSProperties['stroke'];
  /**
   * Rectangle additional style.
   * */
  style?: CSSProperties;
}
export interface PathOptions {
  /**
   * Path line color.
   * @defaultValue 'black'
   * */
  color?: CSSProperties['stroke' | 'fill'];
  /**
   * Path line additional style.
   * */
  style?: CSSProperties;
}
