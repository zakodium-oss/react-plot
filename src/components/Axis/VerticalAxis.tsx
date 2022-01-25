import { useContext } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../../contexts/bboxContext';

import { Ticks } from './Ticks';
import VerticalAxisGridLines from './VerticalAxisGridLines';
import VerticalAxisLabel from './VerticalAxisLabel';
import VerticalAxisLine from './VerticalAxisLine';
import { AxisRendererProps } from './types';

export default function VerticalAxis(props: AxisRendererProps) {
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
    innerOffset,
    secondaryTickLength,
    scale,
    secondaryTickStyle,
  } = props;

  const isRight = position === 'right';
  const textOffset = 3;
  const transform = isRight ? `translate(${plotWidth}, 0)` : undefined;

  const ticks = useBBoxObserver();

  function getTickPosition(value: number, secondary = false) {
    const { x1, x2, textPosition } = getTickX(secondary);
    return {
      line: {
        y1: value,
        y2: value,
        x1: x1,
        x2: x2,
      },
      text: { y1: value, x1: isRight ? textPosition : -textPosition },
    };
  }
  function getTickX(secondary = false) {
    const tickLength = secondary ? secondaryTickLength : primaryTickLength;
    const x = isRight ? tickLength : -tickLength;
    switch (tickPosition) {
      case 'center':
        return {
          x1: x / 2,
          x2: -x / 2,
          textPosition: textOffset + tickLength / 2,
        };
      case 'inner':
        return {
          x1: 0,
          x2: -x,
          textPosition: textOffset,
        };
      case 'outer':
        return {
          x1: 0,
          x2: x,
          textPosition: textOffset + tickLength,
        };
      default:
        return {
          x1: 0,
          x2: 0,
          textPosition: 3,
        };
    }
  }
  const gridLinesElement = displayPrimaryGridLines ? (
    <VerticalAxisGridLines
      position={position}
      plotWidth={plotWidth}
      primaryTicks={primaryTicks}
      style={primaryGridLineStyle}
    />
  ) : null;

  const primaryTicksElement =
    !hidden && !hiddenTicks ? (
      <Ticks
        anchor={isRight ? 'start' : 'end'}
        primaryTicks={primaryTicks}
        getPositions={getTickPosition}
        labelStyle={tickLabelStyle}
        style={primaryTickStyle}
        secondaryTickLength={secondaryTickLength}
        scale={scale}
        secondaryTickStyle={secondaryTickStyle}
      />
    ) : null;

  const axisLineElement =
    !hidden && !hiddenLine ? (
      <VerticalAxisLine style={lineStyle} plotHeight={plotHeight} />
    ) : null;

  const labelElement =
    !hidden && label ? (
      <VerticalAxisLabel
        plotHeight={plotHeight}
        label={label}
        labelStyle={labelStyle}
        horizontalAlign={isRight ? 'start' : 'end'}
      />
    ) : null;

  const bboxRef = useContext(bboxContext);

  return (
    <g transform={transform}>
      {gridLinesElement}
      <g ref={bboxRef}>
        <g ref={ticks.ref}>{primaryTicksElement}</g>
        <g ref={axisRef}>{axisLineElement}</g>
        <g
          transform={`translate(${
            (ticks.width - innerOffset) * (isRight ? 1 : -1)
          }, 0)`}
        >
          {labelElement}
        </g>
      </g>
    </g>
  );
}
