import { CSSProperties, ReactNode } from 'react';
import { AlignGroup } from 'react-d3-utils';

interface VerticalAxisLabelProps {
  plotWidth: number;
  label: ReactNode;
  labelSpace: number;
  labelStyle: CSSProperties;
}

export default function VerticalAxisLabel(props: VerticalAxisLabelProps) {
  const { plotWidth, label, labelStyle } = props;
  return (
    <AlignGroup
      x={0}
      y={plotWidth / 2}
      horizontalAlign="middle"
      verticalAlign="middle"
    >
      {label}
    </AlignGroup>
  );
}
