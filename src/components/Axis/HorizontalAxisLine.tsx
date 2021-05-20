interface HorizontalAxisLineProps {
  plotWidth: number;
}

export default function HorizontalAxisLine(props: HorizontalAxisLineProps) {
  const { plotWidth } = props;
  return <line x1={0} x2={plotWidth} stroke="black" />;
}
