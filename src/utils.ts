import React, { CSSProperties } from 'react';

import { PlotAxisContext } from './contexts/plotContext';
import type {
  CSSFuncProps,
  OnClickFuncProps,
  OnClickProp,
  SeriesPointError,
} from './types';

let currentValue = 1;

/**
 * Creates autoincremental values, generally for series.
 */
export function getNextId() {
  return ++currentValue;
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

/**
 * Validates that two axes are orthogonal between them
 */
export function validateAxis(
  axisContext: Record<string, PlotAxisContext>,
  xKey: string,
  yKey: string,
) {
  const xAxis = axisContext[xKey];
  const yAxis = axisContext[yKey];
  if (!xAxis || !yAxis) return [undefined, undefined];

  if (
    horizontal.includes(xAxis.position)
      ? !vertical.includes(yAxis.position)
      : vertical.includes(xAxis.position)
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
  index: number,
  data: T[],
): CSSProperties {
  let style: CSSProperties = { ...defaultStyle };
  for (const key in elementStyle) {
    if (typeof elementStyle[key] === 'function') {
      style[key] = elementStyle[key](point, index, data);
    } else {
      style[key] = elementStyle[key];
    }
  }
  return style;
}

/**
 * Checks the onClick added to a component and if is a function, gets the resulting value
 */
export function functionalOnClick(
  element: OnClickFuncProps,
  index: number,
): (result: React.MouseEvent<SVGGElement, MouseEvent>) => void {
  let result: (result: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  if (typeof element() === 'function') {
    result = (element as (index: number) => OnClickProp)(index);
  } else {
    result = element as OnClickProp;
  }
  return result;
}

/**
 * validate series point Error
 */
export function validateSeriesPointError(
  error: SeriesPointError,
): SeriesPointError {
  if (typeof error === 'number') return [error, error];
  else if (Array.isArray(error) && error.length >= 2) return error;
  return null;
}

export function closestPoint<T, R>(
  data: T[],
  value: R,
  distanceFun: (a: T, b: R) => number,
): T {
  let closest = {
    index: 0,
    distance: Infinity,
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
  data: { x: number | Date; y: number | Date }[],
) {
  return data.map(({ x, y }) => ({ x: toNumber(x), y: toNumber(y) }));
}

export function toNumber(value: number | Date) {
  if (typeof value === 'number') {
    return value;
  }
  return value.getTime();
}
