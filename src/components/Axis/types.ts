import { CSSProperties, ReactNode, Ref } from 'react';
import { PrimaryLinearTicks, PrimaryLogTicks } from 'react-d3-utils';

import { Horizontal, Vertical } from '../../types';

export interface AxisCommonProps {
  hidden: boolean;
  plotWidth: number;
  plotHeight: number;
  displayPrimaryGridLines: boolean;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  tickLabelStyle?: CSSProperties;
  position: Horizontal | Vertical;
}

export interface AxisRendererProps extends AxisCommonProps {
  axisRef: Ref<SVGGElement>;
  primaryTicks: PrimaryLinearTicks[] | PrimaryLogTicks[];
}

export interface AxisChildProps extends AxisCommonProps {
  scientific: boolean;
}
