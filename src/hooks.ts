import { euclidean } from 'ml-distance-euclidean';

import { Scales } from './components/Axis/types';
import { useLegend } from './contexts/legendContext';
import { usePlotContext } from './contexts/plotContext';
import { validateAxis } from './utils';

type NumberOrString = number | string;

interface UsePositionConfig {
  x: NumberOrString;
  y: NumberOrString;
}

export function usePosition(config: UsePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y } = config;
  return {
    x: convertValue(x, plotWidth, xScale),
    y: convertValue(y, plotHeight, yScale),
  };
}

interface UseRectanglePositionConfig {
  x1: NumberOrString;
  y1: NumberOrString;
  x2: NumberOrString;
  y2: NumberOrString;
}
export function useRectanglePosition(config: UseRectanglePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x1, y1, x2, y2 } = config;

  return {
    x: convertMinValue(x1, x2, plotWidth, xScale),
    y: convertMinValue(y1, y2, plotHeight, yScale),
    width: convertDimensions(x1, x2, plotWidth, xScale),
    height: convertDimensions(y1, y2, plotHeight, yScale),
  };
}
interface UseEllipsePositionConfig {
  cx: NumberOrString;
  cy: NumberOrString;
  rx: NumberOrString;
  ry: NumberOrString;
}

interface UseDirectedEllipsePositionConfig {
  x1: NumberOrString;
  y1: NumberOrString;
  x2: NumberOrString;
  y2: NumberOrString;
  width: NumberOrString;
}

export function useEllipsePosition(props: UseEllipsePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { cx, cy, rx, ry } = props;

  return {
    cx: convertValue(cx, plotWidth, xScale),
    cy: convertValue(cy, plotHeight, yScale),
    rx: convertValueAbs(rx, plotWidth, xScale),
    ry: convertValueAbs(ry, plotHeight, yScale),
  };
}

export function useDirectedEllipsePosition(
  props: UseDirectedEllipsePositionConfig,
) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x1: oldX1, y1: oldY1, x2: oldX2, y2: oldY2, width } = props;
  const { x1, y1, x2, y2 } = {
    x1: convertValue(oldX1, plotWidth, xScale),
    x2: convertValue(oldX2, plotWidth, xScale),
    y1: convertValue(oldY1, plotWidth, yScale),
    y2: convertValue(oldY2, plotWidth, yScale),
  };
  const radsToDegs = (rad: number) => (rad * 180) / Math.PI;
  const { cx, cy } = {
    cx: (x1 + x2) / 2,
    cy: (y1 + y2) / 2,
  };
  const rotation =
    (y1 > y2 ? -1 : 1) *
    (x1 > x2 ? -1 : 1) *
    Math.asin(euclidean([x1, y1], [x1, cy]) / euclidean([x1, y1], [cx, cy]));
  const { widthX, widthY } = {
    widthX:
      (Math.sin(rotation) * convertValueAbs(width, plotHeight, xScale)) / 2,
    widthY:
      (Math.cos(rotation) * convertValueAbs(width, plotHeight, yScale)) / 2,
  };
  return {
    cx,
    cy,
    rx: euclidean([x1, y1], [x2, y2]) / 2,
    ry: euclidean([0, 0], [widthX, widthY]),
    rotation: radsToDegs(rotation),
  };
}

function convertString(value: string, total: number) {
  return value.endsWith('%')
    ? (Number(value.slice(0, -1)) * total) / 100
    : Number(value);
}

function convertValue(value: string | number, total: number, scale?: Scales) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? scale(value) : convertString(value, total);
}

function convertMinValue(
  value1: string | number,
  value2: string | number,
  total: number,
  scale?: Scales,
) {
  if (scale === undefined) return 0;
  return Math.min(
    typeof value2 === 'number' ? scale(value2) : convertString(value2, total),
    typeof value1 === 'number' ? scale(value1) : convertString(value1, total),
  );
}
function convertValueAbs(
  value: string | number,
  total: number,
  scale?: Scales,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number'
    ? Math.abs(scale(0) - scale(value))
    : Math.abs(convertString(value, total));
}

function convertToPx(value: string | number, total: number, scale?: Scales) {
  if (scale === undefined || [0, '0'].includes(value)) return 0;
  return typeof value === 'number'
    ? scale(value) - scale(0)
    : convertString(value, total);
}

function convertDimensions(
  value1: string | number,
  value2: string | number,
  total: number,
  scale?: Scales,
) {
  if (scale === undefined) return 0;
  return Math.abs(
    (typeof value2 === 'number'
      ? scale(value2)
      : convertString(value2, total)) -
      (typeof value1 === 'number'
        ? scale(value1)
        : convertString(value1, total)),
  );
}

export function usePointPosition(config: UsePositionConfig[]) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const points = config;
  return points
    .map(
      (point) =>
        `${convertValue(point.x, plotWidth, xScale)},${convertValue(
          point.y,
          plotHeight,
          yScale,
        )}`,
    )
    .join(' ');
}

export function useIsSeriesVisible(id: string) {
  const [legendState] = useLegend();
  const value = legendState.labels.find((label) => label.id === id);
  return value ? value.isVisible : true;
}

interface UseShiftOptions {
  xAxis: string;
  yAxis: string;
  xShift: number | string;
  yShift: number | string;
}

export function useShift(options: UseShiftOptions) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { xAxis, yAxis, xShift, yShift } = options;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);
  return {
    xShift: convertToPx(xShift, plotWidth, xScale),
    yShift: convertToPx(yShift, plotHeight, yScale),
  };
}
