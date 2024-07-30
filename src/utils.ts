import { CSSProperties, useMemo } from 'react';

import { Scales } from './components/Axis/types';
import { PlotAxisContext } from './contexts/plotContext';
import type {
  CSSFuncProps,
  LabelFuncProps,
  SeriesPoint,
  SeriesPointError,
  Shape,
  ShapeFuncProps,
} from './types';

let currentValue = 1;

/**
 * Creates autoincremental values, generally for series.
 */
export function getNextId() {
  return ++currentValue;
}

export function useId(id: string | undefined, prefix: string) {
  return useMemo(() => {
    if (id) return id;
    return `${prefix}-${getNextId()}`;
  }, [id, prefix]);
}

const horizontal = ['top', 'bottom'];
const vertical = ['left', 'right'];
/**
 * Validates that two positions are not orthogonal between them
 */
export function validatePosition(
  currPosition: string,
  position: string,
  id: string,
) {
  const error =
    (horizontal.includes(currPosition) && !horizontal.includes(position)) ||
    (vertical.includes(currPosition) && !vertical.includes(position));
  if (error) {
    throw new Error(`The positions are ortogonal for ${id}`);
  }
}
interface ValidateAxisOptions {
  onlyOrthogonal?: boolean;
}
/**
 * Validates that two axes are orthogonal between them
 */
export function validateAxis(
  axisContext: Record<string, PlotAxisContext>,
  xKey: string,
  yKey: string,
  options: ValidateAxisOptions = {},
): [Scales, Scales] | [undefined, undefined] {
  const { onlyOrthogonal = false } = options;
  const xAxis = axisContext[xKey];
  const yAxis = axisContext[yKey];
  if (!xAxis || !yAxis) return [undefined, undefined];
  if (
    onlyOrthogonal &&
    ((horizontal.includes(xAxis.position) &&
      horizontal.includes(yAxis.position)) ||
      (vertical.includes(yAxis.position) && vertical.includes(xAxis.position)))
  ) {
    throw new Error(`The axis ${xKey} and ${yKey} are not orthogonal`);
  }
  if (
    !onlyOrthogonal &&
    (horizontal.includes(xAxis.position)
      ? !vertical.includes(yAxis.position)
      : vertical.includes(xAxis.position))
  ) {
    if (
      vertical.includes(xAxis.position) ||
      horizontal.includes(yAxis.position)
    ) {
      throw new Error(
        `The axis ${xKey} should be ${horizontal.join(
          ' ',
        )} and ${yKey} should be ${vertical.join(' ')}`,
      );
    }

    throw new Error(`The axis ${xKey} and ${yKey} are not orthogonal`);
  }
  return [xAxis.scale, yAxis.scale];
}

/**
 * Checks the style added to a component and if is a function, gets the resulting value
 */
export function functionalStyle<T>(
  defaultStyle: CSSProperties,
  elementStyle: CSSFuncProps<T>,
  point: T,
  index?: number,
  data?: readonly T[],
): CSSProperties {
  const style: CSSProperties = { ...defaultStyle };
  for (const key in elementStyle) {
    // @ts-expect-error Type is too complex
    if (typeof elementStyle[key] === 'function') {
      // @ts-expect-error Type is too complex
      style[key] = elementStyle[key](point, index, data);
    } else {
      // @ts-expect-error Type is too complex
      style[key] = elementStyle[key];
    }
  }
  return style;
}
/**
 * Checks the marker added to a component and if is a function, gets the resulting value
 */
export function functionalShape<T>(
  elementStyle: ShapeFuncProps<T>,
  point: T,
  index?: number,
  data?: readonly T[],
): Shape {
  let shape: Shape;
  if (typeof elementStyle === 'function') {
    shape = elementStyle(point, index, data);
  } else {
    shape = elementStyle;
  }
  return shape;
}
/**
 * Checks the label added to a component and if is a function, gets the resulting value
 */
export function functionalLabel<T>(
  elementStyle: LabelFuncProps<T>,
  point: T,
  index?: number,
  data?: readonly T[],
): string {
  let shape: string;
  if (typeof elementStyle === 'function') {
    shape = elementStyle(point, index, data);
  } else {
    shape = elementStyle;
  }
  return shape;
}
/**
 * validate series point Error
 */
export function validateSeriesPointError(
  error?: SeriesPointError,
): Exclude<SeriesPointError, number> | null {
  if (typeof error === 'number') return [error, error];
  else if (Array.isArray(error) && error.length >= 2) return error;
  return null;
}

export function closestPoint<T, R>(
  data: readonly T[],
  value: R,
  distanceFun: (a: T, b: R) => number,
): T {
  const closest = {
    index: 0,
    distance: Number.POSITIVE_INFINITY,
  };
  for (let i = 0; i < data.length; i++) {
    const distance = distanceFun(data[i], value);
    if (distance < closest.distance) {
      closest.index = i;
      closest.distance = distance;
    }
  }
  return data[closest.index];
}

export function dataConvertDate(
  data: Array<{ x: number | Date; y: number | Date }>,
) {
  return data.map(({ x, y }) => ({ x: toNumber(x), y: toNumber(y) }));
}

export function toNumber(value: number | Date) {
  if (value === undefined) {
    return value;
  }
  if (typeof value === 'number') {
    return value;
  }
  return value.getTime();
}

export function middlePoint(point1: SeriesPoint, point2: SeriesPoint) {
  return { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };
}
