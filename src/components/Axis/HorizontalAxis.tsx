import { useContext } from 'react';
import { useBBoxObserver } from 'react-d3-utils';

import { bboxContext } from '../../contexts/bboxContext.js';

import HorizontalAxisGridLines from './HorizontalAxisGridLines.js';
import HorizontalAxisLabel from './HorizontalAxisLabel.js';
import HorizontalAxisLine from './HorizontalAxisLine.js';
import { Ticks } from './Ticks.js';
import type { AxisRendererProps } from './types.js';

export default function HorizontalAxis(props: AxisRendererProps) {
  const {
    primaryTickStyle,
    primaryTickLength,
    tickPosition,
    hiddenTicks,
    lineStyle,
    hiddenLine,
    hidden,
    plotWidth,
    plotHeight,
    displayPrimaryGridLines,
    displaySecondaryGridLines,
    primaryGridLineStyle,
    secondaryGridLineStyle,
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

  const isBottom = position === 'bottom';

  const textOffset = 0;
  const transform = isBottom ? `translate(0, ${plotHeight})` : undefined;

  const ticks = useBBoxObserver();
  function getTickPosition(value: number, secondary = false) {
    const { y1, y2, textPosition } = getTickY(secondary);
    return {
      line: {
        x1: value,
        x2: value,
        y1,
        y2,
      },
      text: {
        x1: value,
        y1: isBottom ? textPosition : -textPosition,
      },
    };
  }
  function getTickY(secondary = false) {
    const tickLength = secondary ? secondaryTickLength : primaryTickLength;
    const y = isBottom ? tickLength : -tickLength;
    switch (tickPosition) {
      case 'center':
        return {
          y1: y / 2,
          y2: -y / 2,
          textPosition: textOffset + tickLength / 2,
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
          textPosition: textOffset + tickLength,
        };
      default:
        return {
          y1: 0,
          y: 0,
          textPosition: 0,
        };
    }
  }
  const gridLinesElement =
    displayPrimaryGridLines || displaySecondaryGridLines ? (
      <HorizontalAxisGridLines
        position={position}
        plotHeight={plotHeight}
        primaryTicks={primaryTicks}
        style={primaryGridLineStyle}
        primaryGrid={displayPrimaryGridLines}
        secondaryGrid={displaySecondaryGridLines}
        secondaryStyle={secondaryGridLineStyle}
        scale={scale}
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
        secondaryTickLength={secondaryTickLength}
        scale={scale}
        secondaryTickStyle={secondaryTickStyle}
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
        <g
          transform={`translate(0, ${
            (ticks.height - innerOffset) * (isBottom ? 1 : -1)
          })`}
        >
          {labelElement}
        </g>
      </g>
    </g>
  );
}
