import { euclidean } from 'ml-distance-euclidean';

import { Scales } from './components/Axis/types';
import { useLegend } from './contexts/legendContext';
import { usePlotContext } from './contexts/plotContext';
import { ScalarValue } from './types';
import { validateAxis } from './utils';

// annotation hooks
interface UsePositionConfig {
  x: ScalarValue;
  y: ScalarValue;
  xAxis: string;
  yAxis: string;
}

export function usePosition(config: UsePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { x, y, xAxis, yAxis } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });
  return {
    x: convertValue(x, plotWidth, xScale),
    y: convertValue(y, plotHeight, yScale),
  };
}
interface UsePointsPositionConfig {
  xAxis: string;
  yAxis: string;
  points: { x: ScalarValue; y: ScalarValue }[];
}
export function usePointsPosition(config: UsePointsPositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { points, xAxis, yAxis } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });
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
interface UseRectanglePositionConfig {
  xAxis: string;
  yAxis: string;
  x1: ScalarValue;
  y1: ScalarValue;
  x2: ScalarValue;
  y2: ScalarValue;
}
export function useRectanglePosition(config: UseRectanglePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { x1, y1, x2, y2, xAxis, yAxis } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });

  return {
    x: convertMinValue(x1, x2, plotWidth, xScale),
    y: convertMinValue(y1, y2, plotHeight, yScale),
    width: convertDimensions(x1, x2, plotWidth, xScale),
    height: convertDimensions(y1, y2, plotHeight, yScale),
  };
}
interface UseEllipsePositionConfig {
  xAxis: string;
  yAxis: string;
  cx: ScalarValue;
  cy: ScalarValue;
  rx: ScalarValue;
  ry: ScalarValue;
}

export function useEllipsePosition(config: UseEllipsePositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { cx, cy, rx, ry, xAxis, yAxis } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });

  return {
    cx: convertValue(cx, plotWidth, xScale),
    cy: convertValue(cy, plotHeight, yScale),
    rx: convertValueAbs(rx, plotWidth, xScale),
    ry: convertValueAbs(ry, plotHeight, yScale),
  };
}
interface UseBoxPlotPositionConfig {
  xAxis: string;
  yAxis: string;
  min: ScalarValue;
  max: ScalarValue;
  q1: ScalarValue;
  median: ScalarValue;
  q3: ScalarValue;
  width: ScalarValue;
  y: ScalarValue;
}
export function useBoxPlotPosition(config: UseBoxPlotPositionConfig) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { min, max, q1, median, q3, width, y, xAxis, yAxis } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });
  const horizontal = ['top', 'bottom'].includes(axisContext[xAxis]?.position);

  return {
    min: convertValue(min, plotWidth, xScale),
    max: convertValue(max, plotWidth, xScale),
    q1: convertValue(q1, plotWidth, xScale),
    median: convertValue(median, plotWidth, xScale),
    q3: convertValue(q3, plotWidth, xScale),
    y: convertValue(y, plotHeight, yScale),
    width: convertValueAbs(width, plotHeight, yScale),
    horizontal,
  };
}
interface UseDirectedEllipsePositionConfig {
  xAxis: string;
  yAxis: string;
  x1: ScalarValue;
  y1: ScalarValue;
  x2: ScalarValue;
  y2: ScalarValue;
  width: ScalarValue;
}
export function useDirectedEllipsePosition(
  config: UseDirectedEllipsePositionConfig,
) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const {
    x1: oldX1,
    y1: oldY1,
    x2: oldX2,
    y2: oldY2,
    width,
    xAxis,
    yAxis,
  } = config;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });

  const { x1, y1, x2, y2 } = {
    x1: convertValue(oldX1, plotWidth, xScale),
    x2: convertValue(oldX2, plotWidth, xScale),
    y1: convertValue(oldY1, plotWidth, yScale),
    y2: convertValue(oldY2, plotWidth, yScale),
  };

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
function radsToDegs(rad: number) {
  return (rad * 180) / Math.PI;
}

// convert functions
function convertString(value: string, total: number) {
  if (value === undefined) return 0;
  return value.endsWith('%')
    ? (Number(value.slice(0, -1)) * total) / 100
    : Number(value);
}

function convertValue(value: ScalarValue, total: number, scale?: Scales) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? scale(value) : convertString(value, total);
}

function convertMinValue(
  value1: ScalarValue,
  value2: ScalarValue,
  total: number,
  scale?: Scales,
) {
  if (scale === undefined) return 0;
  return Math.min(
    typeof value2 === 'number' ? scale(value2) : convertString(value2, total),
    typeof value1 === 'number' ? scale(value1) : convertString(value1, total),
  );
}
function convertValueAbs(value: ScalarValue, total: number, scale?: Scales) {
  if (scale === undefined) return 0;
  return typeof value === 'number'
    ? Math.abs(scale(0) - scale(value))
    : Math.abs(convertString(value, total));
}

function convertToPx(value: ScalarValue, total: number, scale?: Scales) {
  if (scale === undefined) return 0;
  return typeof value === 'number'
    ? scale(value) - scale(0)
    : convertString(value, total);
}

function convertDimensions(
  value1: ScalarValue,
  value2: ScalarValue,
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

// other hooks
export function useIsSeriesVisible(id: string) {
  const [legendState] = useLegend();
  const value = legendState.labels.find((label) => label.id === id);
  return value ? value.isVisible : true;
}

interface UseShiftOptions {
  xAxis: string;
  yAxis: string;
  xShift: ScalarValue;
  yShift: ScalarValue;
}

export function useShift(options: UseShiftOptions) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const { xAxis, yAxis, xShift, yShift } = options;
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis, {
    onlyOrthogonal: true,
  });
  return {
    xShift: convertToPx(xShift, plotWidth, xScale),
    yShift: convertToPx(yShift, plotHeight, yScale),
  };
}
