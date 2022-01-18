import { useContext } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../../contexts/bboxContext';

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

  const textOffset = 0;
  const transform = isBottom ? `translate(0, ${plotHeight})` : undefined;

  const ticks = useBBoxObserver();
  function getTickPosition(value: number) {
    const { y1, y2, textPosition } = getTickY();
    return {
      line: {
        x1: value,
        x2: value,
        y1: y1,
        y2: y2,
      },
      text: {
        x1: value,
        y1: isBottom ? textPosition : -textPosition,
      },
    };
  }
  function getTickY() {
    const y = isBottom ? primaryTickLength : -primaryTickLength;
    switch (tickPosition) {
      case 'center':
        return {
          y1: y / 2,
          y2: -y / 2,
          textPosition: textOffset + primaryTickLength / 2,
        };
      case 'inner':
        return {
          y1: 0,
          y2: -y,
          textPosition: textOffset,
        };
      case 'outer':
        return {
          y1: 0,
          y2: y,
          textPosition: textOffset + primaryTickLength,
        };
      default:
        return {
          y1: 0,
          y: 0,
          textPosition: 0,
        };
    }
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
        getPositions={getTickPosition}
        labelStyle={tickLabelStyle}
        style={primaryTickStyle}
        dominantBaseline={isBottom ? 'text-before-edge' : 'text-after-edge'}
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
