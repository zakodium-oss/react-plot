import { PrimaryLinearTicks, PrimaryLogTicks } from 'react-d3-utils';

interface VerticalAxisGridlinesProps {
  plotWidth: number;
  primaryTicks: PrimaryLinearTicks[] | PrimaryLogTicks[];
}

export default function VerticalAxisGridlines(
  props: VerticalAxisGridlinesProps,
) {
  const { plotWidth, primaryTicks } = props;
  return (
    <g>
      {primaryTicks.map(({ position }) => (
        <line
          key={position}
          x1="0"
          x2={plotWidth}
          y1={position}
          y2={position}
          stroke="black"
          strokeDasharray="2,2"
          strokeOpacity={0.5}
        />
      ))}
    </g>
  );
}
