import { Scales } from './components/Axis/types';
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
