import { useMemo } from 'react';

import { LegendPosition } from '../components/Legend';
import { PlotAxisState } from '../contexts/plotContext';
import { Margins, VerticalPosition } from '../types';

export function usePlotSizes({
  width,
  height,
  margin,
  axes,
  topAxisHeight,
  rightAxisWidth,
  bottomAxisHeight,
  leftAxisWidth,
  headingPosition,
  headingHeight,
  legendPosition,
  legendMargin,
  legendWidth,
  legendHeight,
}: {
  width: number;
  height: number;
  margin: Margins;
  axes: Record<string, PlotAxisState>;
  topAxisHeight: number;
  rightAxisWidth: number;
  bottomAxisHeight: number;
  leftAxisWidth: number;
  headingPosition: VerticalPosition | null;
  headingHeight: number;
  legendPosition: LegendPosition | null;
  legendMargin: number;
  legendWidth: number;
  legendHeight: number;
}) {
  const { top = 0, right = 0, bottom = 0, left = 0 } = margin;
  return useMemo(() => {
    const axisOffsets = axesToOffsets(axes);

    const finalTopAxisHeight = topAxisHeight - axisOffsets.top;
    const finalRightAxisWidth = rightAxisWidth - axisOffsets.right;
    const finalBottomAxisHeight = bottomAxisHeight - axisOffsets.bottom;
    const finalLeftAxisWidth = leftAxisWidth - axisOffsets.left;

    let plotWidth =
      width - left - finalLeftAxisWidth - right - finalRightAxisWidth;
    let plotHeight =
      height -
      top -
      headingHeight -
      finalTopAxisHeight -
      bottom -
      finalBottomAxisHeight;

    let leftOffset = left + finalLeftAxisWidth;
    let topOffset = top + finalTopAxisHeight;

    if (headingPosition === 'top') {
      topOffset += headingHeight;
    }

    const totalLegendHeight = legendHeight + legendMargin;
    const totalLegendWidth = legendWidth + legendMargin;

    let legendOffset = 0;
    switch (legendPosition) {
      case 'top':
        plotHeight -= totalLegendHeight;
        topOffset += totalLegendHeight;
        legendOffset = finalTopAxisHeight + legendMargin;
        break;
      case 'right':
        plotWidth -= totalLegendWidth;
        legendOffset = finalRightAxisWidth + legendMargin;
        break;
      case 'bottom':
        plotHeight -= totalLegendHeight;
        legendOffset = finalBottomAxisHeight + legendMargin;
        break;
      case 'left':
        plotWidth -= totalLegendWidth;
        leftOffset += totalLegendWidth;
        legendOffset = finalLeftAxisWidth + legendMargin;
        break;
      default:
        break;
    }

    return { plotWidth, plotHeight, leftOffset, topOffset, legendOffset };
  }, [
    width,
    height,
    top,
    right,
    bottom,
    left,
    topAxisHeight,
    rightAxisWidth,
    bottomAxisHeight,
    leftAxisWidth,
    headingPosition,
    headingHeight,
    legendPosition,
    legendMargin,
    legendWidth,
    legendHeight,
    axes,
  ]);
}

function axesToOffsets(axes: Record<string, PlotAxisState>) {
  const offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  for (const axis of Object.values(axes)) {
    offsets[axis.position] = axis.innerOffset;
  }

  return offsets;
}
