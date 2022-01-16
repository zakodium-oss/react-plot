import { ScaleLinear } from 'd3-scale';

import { usePlotContext } from './plotContext';
import { validateAxis } from './utils';

type NumberOrString = number | string;

interface UsePositionConfig {
  x: NumberOrString;
  y: NumberOrString;
}

export function usePosition(config: UsePositionConfig) {
  const { axisContext, width, height } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y } = config;
  return {
    x: convertValue(x, width, xScale),
    y: convertValue(y, height, yScale),
  };
}

interface UseRectanglePositionConfig {
  x1: NumberOrString;
  y1: NumberOrString;
  x2: NumberOrString;
  y2: NumberOrString;
}
export function useRectanglePosition(config: UseRectanglePositionConfig) {
  const { axisContext, width, height } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x1, y1, x2, y2 } = config;

  return {
    x: convertMinValue(x1, x2, width, xScale),
    y: convertMinValue(y1, y2, height, yScale),
    width: convertDimensions(x1, x2, width, xScale),
    height: convertDimensions(y1, y2, height, yScale),
  };
}
interface UseEllipsePositionConfig {
  cx: NumberOrString;
  cy: NumberOrString;
  rx: NumberOrString;
  ry: NumberOrString;
}

export function useEllipsePosition(props: UseEllipsePositionConfig) {
  const { axisContext, width, height } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { cx, cy, rx, ry } = props;

  return {
    cx: convertValue(cx, width, xScale),
    cy: convertValue(cy, height, yScale),
    rx: convertValueAbs(rx, width, xScale),
    ry: convertValueAbs(ry, height, yScale),
  };
}

function convertValue(
  value: string | number,
  total: number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number'
    ? scale(value)
    : value.endsWith('%')
    ? (Number(value.substring(0, value.length - 1)) * total) / 100
    : Number(value);
}
function convertMinValue(
  value1: string | number,
  value2: string | number,
  total: number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return Math.min(
    typeof value2 === 'number'
      ? scale(value2)
      : value2.endsWith('%')
      ? (Number(value2.substring(0, value2.length - 1)) * total) / 100
      : Number(value2),
    typeof value1 === 'number'
      ? scale(value1)
      : value1.endsWith('%')
      ? (Number(value1.substring(0, value1.length - 1)) * total) / 100
      : Number(value1),
  );
}
function convertValueAbs(
  value: string | number,
  total: number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number'
    ? Math.abs(scale(0) - scale(value))
    : value.endsWith('%')
    ? (Number(value.substring(0, value.length - 1)) * total) / 100
    : Number(value);
}
function convertDimensions(
  value1: string | number,
  value2: string | number,
  total: number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return Math.abs(
    (typeof value2 === 'number'
      ? scale(value2)
      : value2.endsWith('%')
      ? (Number(value2.substring(0, value2.length - 1)) * total) / 100
      : Number(value2)) -
      (typeof value1 === 'number'
        ? scale(value1)
        : value1.endsWith('%')
        ? (Number(value1.substring(0, value1.length - 1)) * total) / 100
        : Number(value1)),
  );
}
export function usePointPosition(config: UsePositionConfig[]) {
  const { axisContext, width, height } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const points = config;
  return points
    .map(
      (point) =>
        `${convertValue(point.x, width, xScale)},${convertValue(
          point.y,
          height,
          yScale,
        )}`,
    )
    .join(' ');
}
