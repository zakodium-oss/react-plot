import { useContext } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../../bboxContext';

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
    displayPrimaryGridLines,
    label,
    labelStyle,
    tickEmbedded,
    axisRef,
    primaryTicks,
    position,
  } = props;

  const isBottom = position === 'bottom';

  const transform = isBottom ? `translate(0, ${plotHeight})` : undefined;

  const ticks = useBBoxObserver();

  function getTickPosition(value: number) {
    return {
      line: {
        x1: value,
        x2: value,
        y2: (tickEmbedded && isBottom) || !isBottom ? -5 : 5,
      },
      text: { x1: value, y1: isBottom ? 16 : -12 },
    };
  }

  const gridLinesElement = displayPrimaryGridLines ? (
    <HorizontalAxisGridLines
      position={position}
      plotHeight={plotHeight}
      primaryTicks={primaryTicks}
    />
  ) : null;

  const primaryTicksElement = !hidden ? (
    <Ticks
      anchor="middle"
      primaryTicks={primaryTicks}
      getPositions={getTickPosition}
    />
  ) : null;

  const axisLineElement = !hidden ? (
    <HorizontalAxisLine plotWidth={plotWidth} />
  ) : null;

  const labelElement =
    !hidden && label ? (
      <HorizontalAxisLabel
        plotWidth={plotWidth}
        label={label}
        labelStyle={labelStyle}
      />
    ) : null;

  const bboxRef = useContext(bboxContext);

  return (
    <g transform={transform}>
      {gridLinesElement}
      <g ref={bboxRef}>
        <g ref={ticks.ref}>{primaryTicksElement}</g>
        <g ref={axisRef}>{axisLineElement}</g>
        <g transform={`translate(0, ${ticks.height})`}>{labelElement}</g>
      </g>
    </g>
  );
}
