import { Children, CSSProperties, isValidElement, ReactNode } from 'react';

import { Annotations } from './components/Annotations/Annotation';
import Axis from './components/Axis';
import ParallelAxis from './components/Axis/ParallelAxis';
import BarSeries from './components/BarSeries';
import Heading from './components/Heading';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import RangeSeries from './components/RangeSeries';
import ScatterSeries from './components/ScatterSeries';
import type {
  AxisContextType,
  CSSFuncProps,
  PlotChildren,
  SeriesPointErrorType,
} from './types';

let currentValue = 1;

/**
 * Creates autoincremental values, generally for series.
 */
export function getNextId() {
  return ++currentValue;
}

/**
 * Validates that all the children inside Plot are supported and organizes them by kind.
 */
export function splitChildren(children: ReactNode): PlotChildren {
  const axes = [];
  let topHeading = null;
  let bottomHeading = null;
  let legend = null;
  let seriesAndAnnotations = [];

  for (let child of Children.toArray(children)) {
    if (typeof child !== 'object' || !isValidElement(child)) {
      // eslint-disable-next-line no-console
      console.error('Invalid Plot child:', child);
      throw new Error('invalid Plot child');
    } else if (
      child.type === LineSeries ||
      child.type === ScatterSeries ||
      child.type === RangeSeries ||
      child.type === BarSeries ||
      child.type === Annotations
    ) {
      seriesAndAnnotations.push(child);
    } else if (child.type === Axis || child.type === ParallelAxis) {
      axes.push(child);
    } else if (child.type === Heading) {
      if (topHeading !== null || bottomHeading !== null) {
        throw new Error('Plot can only have one Heading element');
      }
      if (child.props.position === 'top') {
        topHeading = child;
      } else {
        bottomHeading = child;
      }
    } else if (child.type === Legend) {
      if (legend !== null) {
        throw new Error('Plot can only have one Legend element');
      }
      legend = child;
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid Plot child: ', child);
      throw new Error('invalid plot child');
    }
  }

  return {
    seriesAndAnnotations,
    axes,
    topHeading,
    bottomHeading,
    legend,
  };
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
  axisContext: Record<string, AxisContextType>,
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
 * Calculate Ticks number to display
 */
export function calculateTicksNumber(
  plotWidth: number,
  scientific: boolean,
  domain: number[] = [0, 1],
): number {
  const fontSizeDefault = 16;
  const scientificTickLength = 7;
  let tickLength = `${Math.trunc(domain[1])}`.length;
  // if domain too small => tickLength+2 for decimal values
  tickLength =
    domain[1] - domain[0] < plotWidth * 0.05 ? tickLength + 2 : tickLength;

  const ticksNumber = scientific
    ? plotWidth / (scientificTickLength * fontSizeDefault)
    : plotWidth / (tickLength * fontSizeDefault);

  return ticksNumber;
}

/**
 * validate series point Error
 */
export function validateSeriesPointError(
  error: SeriesPointErrorType,
): SeriesPointErrorType {
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
