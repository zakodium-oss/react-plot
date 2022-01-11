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
interface UseRectanglePositionConfig {
  x1: NumberOrString;
  y1: NumberOrString;
  x2: NumberOrString;
  y2: NumberOrString;
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
export function useRectanglePosition(config: UseRectanglePositionConfig) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x1, y1, x2, y2 } = config;

  return {
    x: convertMinValue(x1, x2, xScale),
    y: convertMinValue(y1, y2, yScale),
    width: convertDimensions(x1, x2, xScale),
    height: convertDimensions(y1, y2, yScale),
  };
}
interface UseEllipsePositionConfig {
  x: NumberOrString;
  y: NumberOrString;
  rx: NumberOrString;
  ry: NumberOrString;
}

export function useEllipsePosition(props: UseEllipsePositionConfig) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y, rx, ry } = props;

  return {
    x: convertValue(x, xScale),
    y: convertValue(y, yScale),
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
function convertMinValue(
  value1: string | number,
  value2: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return Math.min(
    typeof value2 === 'number' ? scale(value2) : parseInt(value2, 10),
    typeof value1 === 'number' ? scale(value1) : parseInt(value1, 10),
  );
}
function convertValueAbs(
  value: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? Math.abs(scale(0) - scale(value)) : value;
}
function convertDimensions(
  value1: string | number,
  value2: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return Math.abs(
    (typeof value2 === 'number' ? scale(value2) : parseInt(value2, 10)) -
      (typeof value1 === 'number' ? scale(value1) : parseInt(value1, 10)),
  );
}
