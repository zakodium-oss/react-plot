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
    primaryTickStyle,
    primaryTickLength,
    tickPosition,
    hiddenTicks,
    primaryGridLineStyle,
    lineStyle,
    hiddenLine,
    hidden,
    plotWidth,
    plotHeight,
    displayPrimaryGridLines,
    label,
    labelStyle,
    axisRef,
    primaryTicks,
    position,
    tickLabelStyle,
  } = props;

  const isBottom = position === 'bottom';

  const transform = isBottom ? `translate(0, ${plotHeight})` : undefined;

  const ticks = useBBoxObserver();
  function getTickPosition(
    position: 'inner' | 'outer' | 'center',
    primaryTickLength: number,
  ) {
    const y1 = position === 'center' ? (isBottom ? -5 : primaryTickLength) : 0;
    const y2 =
      position === 'inner'
        ? isBottom
          ? -1 * primaryTickLength
          : primaryTickLength
        : !isBottom
        ? -1 * primaryTickLength
        : primaryTickLength;
    return (value: number) => {
      return {
        line: {
          x1: value,
          x2: value,
          y1: y1,
          y2: y2,
        },
        text: { x1: value, y1: isBottom ? 16 : -12 },
      };
    };
  }
  const gridLinesElement = displayPrimaryGridLines ? (
    <HorizontalAxisGridLines
      position={position}
      plotHeight={plotHeight}
      primaryTicks={primaryTicks}
      style={primaryGridLineStyle}
    />
  ) : null;

  const primaryTicksElement =
    !hidden && !hiddenTicks ? (
      <Ticks
        anchor="middle"
        primaryTicks={primaryTicks}
        getPositions={getTickPosition(tickPosition, primaryTickLength)}
        labelStyle={tickLabelStyle}
        style={primaryTickStyle}
      />
    ) : null;

  const axisLineElement =
    !hidden && !hiddenLine ? (
      <HorizontalAxisLine style={lineStyle} plotWidth={plotWidth} />
    ) : null;

  const labelElement =
    !hidden && label ? (
      <HorizontalAxisLabel
        plotWidth={plotWidth}
        label={label}
        labelStyle={labelStyle}
        verticalAlign={isBottom ? 'start' : 'end'}
      />
    ) : null;

  const bboxRef = useContext(bboxContext);

  return (
    <g transform={transform}>
      {gridLinesElement}
      <g ref={bboxRef}>
        <g ref={ticks.ref}>{primaryTicksElement}</g>
        <g ref={axisRef}>{axisLineElement}</g>
        <g transform={`translate(0, ${ticks.height * (isBottom ? 1 : -1)})`}>
          {labelElement}
        </g>
      </g>
    </g>
  );
}
