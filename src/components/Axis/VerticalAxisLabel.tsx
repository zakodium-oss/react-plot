import type { CSSProperties, ReactNode } from 'react';
import type { Align } from 'react-d3-utils';
import { AlignGroup } from 'react-d3-utils';

import VerticalText from '../VerticalText.js';

interface VerticalAxisLabelProps {
  plotHeight: number;
  label: ReactNode;
  labelStyle?: CSSProperties;
  horizontalAlign: Align;
}

export default function VerticalAxisLabel(props: VerticalAxisLabelProps) {
  const { plotHeight, label, labelStyle, horizontalAlign } = props;
  return (
    <AlignGroup
      x={0}
      y={plotHeight / 2}
      horizontalAlign={horizontalAlign}
      verticalAlign="middle"
    >
      <VerticalText label={label} style={labelStyle} />
    </AlignGroup>
  );
}
