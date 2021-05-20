import { CSSProperties, ReactNode, Ref } from 'react';
import { PrimaryLinearTicks, PrimaryLogTicks } from 'react-d3-utils';

import { Horizontal, Vertical } from '../../types';

interface AxisCommonProps {
  hidden: boolean;
  plotWidth: number;
  plotHeight: number;
  displayGridLines: boolean;
  label: ReactNode;
  labelSpace: number;
  labelStyle: CSSProperties;
  tickEmbedded: boolean;
  position: Horizontal | Vertical;
}

export interface AxisRendererProps extends AxisCommonProps {
  axisRef: Ref<SVGGElement>;
  primaryTicks: PrimaryLinearTicks[] | PrimaryLogTicks[];
}

export interface AxisChildProps extends AxisCommonProps {
  scientific: boolean;
}
