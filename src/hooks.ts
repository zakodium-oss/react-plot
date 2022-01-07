import { ScaleLinear } from 'd3-scale';

import { usePlotContext } from './plotContext';
import { validateAxis } from './utils';

type NumberOrString = number | string;

interface UsePositionConfig {
  x: NumberOrString;
  y: NumberOrString;
}

export function usePosition(config: UsePositionConfig) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y } = config;
  return {
    x: convertValue(x, xScale),
    y: convertValue(y, yScale),
  };
}

interface UsePositionAndSizeConfig extends UsePositionConfig {
  width: NumberOrString;
  height: NumberOrString;
}

export function usePositionAndSize(config: UsePositionAndSizeConfig) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y, width, height } = config;

  return {
    x: convertValue(x, xScale),
    y: convertValue(y, yScale),
    width: convertValueAbs(width, xScale),
    height: convertValueAbs(height, yScale),
  };
}

interface UseEllipsePositionConfig {
  cx: NumberOrString;
  cy: NumberOrString;
  rx: NumberOrString;
  ry: NumberOrString;
}

export function useEllipsePosition(props: UseEllipsePositionConfig) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { cx, cy, rx, ry } = props;

  return {
    cx: convertValue(cx, xScale),
    cy: convertValue(cy, yScale),
    rx: convertValueAbs(rx, xScale),
    ry: convertValueAbs(ry, yScale),
  };
}

function convertValue(
  value: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? scale(value) : value;
}

function convertValueAbs(
  value: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? Math.abs(scale(0) - scale(value)) : value;
}
