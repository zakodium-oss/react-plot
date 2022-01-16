import { useContext } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../../bboxContext';

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
  } = props;

  const isRight =
    (position === 'right' && tickPosition !== 'inner') ||
    (position === 'left' && tickPosition === 'inner');

  const transform =
    position === 'right' ? `translate(${plotWidth}, 0)` : undefined;

  const ticks = useBBoxObserver();

  function getTickPosition(value: number) {
    const { x1, x2, textPosition } = GetTickX();
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
  function GetTickX() {
    const x = isRight ? primaryTickLength : -1 * primaryTickLength;
    const textPosition = tickLabelStyle?.fontSize
      ? parseFloat(tickLabelStyle.fontSize.toString())
      : 3;
    return tickPosition === 'center'
      ? {
          x1: x / 2,
          x2: -x / 2,
          textPosition: textPosition + primaryTickLength / 2,
        }
      : {
          x1: 0,
          x2: x,
          textPosition: textPosition + primaryTickLength,
        };
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
        horizontalAlign={position === 'right' ? 'start' : 'end'}
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
            ticks.width * (position === 'right' ? 1 : -1)
          }, 0)`}
        >
          {labelElement}
        </g>
      </g>
    </g>
  );
}
