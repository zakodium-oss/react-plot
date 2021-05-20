import HorizontalAxisGridLines from './HorizontalAxisGridLines';
import HorizontalAxisLabel from './HorizontalAxisLabel';
import HorizontalAxisLine from './HorizontalAxisLine';
import { Ticks } from './Ticks';
import { AxisRendererProps } from './types';

export default function HorizontalAxis(props: AxisRendererProps) {
  const {
    hidden,
    plotWidth,
    plotHeight,
    displayGridLines,
    label,
    labelSpace,
    labelStyle,
    tickEmbedded,
    axisRef,
    primaryTicks,
    position,
  } = props;
  const isBottom = position === 'bottom';

  const transform = isBottom ? `translate(0, ${plotHeight})` : undefined;

  function getTickPosition(value: number) {
    return {
      line: { x1: value, x2: value, y2: tickEmbedded ? -5 : 5 },
      text: { x1: value, y1: 16 },
    };
  }

  const gridLinesElement = displayGridLines ? (
    <HorizontalAxisGridLines
      plotHeight={plotHeight}
      primaryTicks={primaryTicks}
    />
  ) : null;

  const primaryTicksElement = !hidden ? (
    <Ticks primaryTicks={primaryTicks} getPositions={getTickPosition} />
  ) : null;

  const axisLineElement = !hidden ? (
    <HorizontalAxisLine plotWidth={plotWidth} />
  ) : null;

  const labelElement =
    !hidden && label ? (
      <HorizontalAxisLabel
        plotWidth={plotWidth}
        label={label}
        labelSpace={labelSpace}
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
