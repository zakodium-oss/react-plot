import { ReactNode } from 'react';
import { AlignGroup } from 'react-d3-utils';

interface VerticalAxisLabelProps {
  plotWidth: number;
  label: ReactNode;
}

export default function VerticalAxisLabel(props: VerticalAxisLabelProps) {
  const { plotWidth, label } = props;
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
