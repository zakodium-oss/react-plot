import { Ticks } from './Ticks';
import VerticalAxisGridLines from './VerticalAxisGridLines';
import VerticalAxisLabel from './VerticalAxisLabel';
import VerticalAxisLine from './VerticalAxisLine';
import { AxisRendererProps } from './types';

export default function VerticalAxis(props: AxisRendererProps) {
  const {
    hidden,
    plotWidth,
    plotHeight,
    displayPrimaryGridLines,
    label,
    labelStyle,
    tickEmbedded,
    axisRef,
    primaryTicks,
    position,
  } = props;

  const isRight = position === 'right';

  const transform = isRight ? `translate(${plotWidth}, 0)` : undefined;

  function getTickPosition(value: number) {
    return {
      line: { y1: value, y2: value, x2: tickEmbedded ? -5 : 5 },
      text: { y1: value, x1: 16 },
    };
  }

  const gridLinesElement = displayPrimaryGridLines ? (
    <VerticalAxisGridLines plotWidth={plotWidth} primaryTicks={primaryTicks} />
  ) : null;

  const primaryTicksElement = !hidden ? (
    <Ticks primaryTicks={primaryTicks} getPositions={getTickPosition} />
  ) : null;

  const axisLineElement = !hidden ? (
    <VerticalAxisLine plotHeight={plotHeight} />
  ) : null;

  const labelElement =
    !hidden && label ? (
      <VerticalAxisLabel
        plotHeight={plotHeight}
        label={label}
        labelStyle={labelStyle}
      />
    ) : null;

  return (
    <g ref={axisRef} transform={transform}>
      {gridLinesElement}
      {primaryTicksElement}
      {axisLineElement}
      {labelElement}
    </g>
  );
}
