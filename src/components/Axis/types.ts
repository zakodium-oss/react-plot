import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';
import { CSSProperties, ReactNode, Ref } from 'react';
import { PrimaryLinearTicks, PrimaryLogTicks, TimeTicks } from 'react-d3-utils';

import type { Position, TickLabelFormat, TickPosition } from '../../types';

export interface AxisCommonProps {
  hidden: boolean;
  plotWidth: number;
  plotHeight: number;
  displayPrimaryGridLines: boolean;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  tickLabelStyle?: CSSProperties;
  position: Position;
  lineStyle?: CSSProperties;
  hiddenLine?: boolean;
  primaryGridLineStyle?: CSSProperties;
  displaySecondaryGridLines?: boolean;
  secondaryGridLineStyle?: CSSProperties;
  hiddenTicks?: boolean;
  tickPosition?: TickPosition;
  primaryTickLength: number;
  primaryTickStyle?: CSSProperties;
  innerOffset: number;
  secondaryTickLength: number;
  scale: Scales;
  secondaryTickStyle?: CSSProperties;
}
export type Scales =
  | ScaleLinear<number, number>
  | ScaleLogarithmic<number, number>
  | ScaleTime<number, number>;
export interface AxisRendererProps extends AxisCommonProps {
  axisRef: Ref<SVGGElement>;
  primaryTicks: TicksType[];
}

export interface AxisChildProps<ScaleType> extends AxisCommonProps {
  tickLabelFormat?: TickLabelFormat<ScaleType>;
}

export type TicksType = PrimaryLinearTicks | PrimaryLogTicks | TimeTicks;
