interface VerticalAxisLineProps {
  plotHeight: number;
}

export default function VerticalAxisLine(props: VerticalAxisLineProps) {
  const { plotHeight } = props;
  return <line y1={0} y2={plotHeight} stroke="black" />;
}
