import { useMemo } from 'react';

import { LegendPosition } from '..';
import { Margins, VerticalPosition } from '../types';

export function usePlotSizes({
  width,
  height,
  margin,
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
    let plotWidth = width - left - leftAxisWidth - right - rightAxisWidth;
    let plotHeight =
      height - top - headingHeight - topAxisHeight - bottom - bottomAxisHeight;

    let leftOffset = left + leftAxisWidth;
    let topOffset = top + topAxisHeight;

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
        legendOffset = topAxisHeight + legendMargin;
        break;
      case 'right':
        plotWidth -= totalLegendWidth;
        legendOffset = rightAxisWidth + legendMargin;
        break;
      case 'bottom':
        plotHeight -= totalLegendHeight;
        legendOffset = bottomAxisHeight + legendMargin;
        break;
      case 'left':
        plotWidth -= totalLegendWidth;
        leftOffset += totalLegendWidth;
        legendOffset = leftAxisWidth + legendMargin;
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
  ]);
}
