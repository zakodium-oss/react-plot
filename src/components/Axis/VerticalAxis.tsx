import VerticalAxisGridLines from './VerticalAxisGridLines';
import VerticalAxisLabel from './VerticalAxisLabel';
import { AxisRendererProps } from './types';

export default function VerticalAxis(props: AxisRendererProps) {
  const {
    hidden,
    plotWidth,
    displayGridLines,
    label,
    labelSpace,
    labelStyle,
    axisRef,
    primaryTicks,
  } = props;

  const gridLinesElement = displayGridLines ? (
    <VerticalAxisGridLines plotWidth={plotWidth} primaryTicks={primaryTicks} />
  ) : null;

  const labelElement =
    !hidden && label ? (
      <VerticalAxisLabel
        plotWidth={plotWidth}
        label={label}
        labelSpace={labelSpace}
        labelStyle={labelStyle}
      />
    ) : null;

  return (
    <g ref={axisRef}>
      {gridLinesElement}
      {labelElement}
    </g>
  );
}
