import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import { Annotations } from '../components/Annotations/Annotation';
import Axis from '../components/Axis/Axis';
import ParallelAxis from '../components/Axis/ParallelAxis';
import BarSeries from '../components/BarSeries';
import Heading from '../components/Heading';
import Legend from '../components/Legend';
import LineSeries from '../components/LineSeries';
import RangeSeries from '../components/RangeSeries';
import ScatterSeries from '../components/ScatterSeries';

export interface PlotChildren {
  seriesAndAnnotations: ReactElement[];
  topAxis: ReactElement | null;
  rightAxis: ReactElement | null;
  bottomAxis: ReactElement | null;
  leftAxis: ReactElement | null;
  topHeading: ReactElement | null;
  bottomHeading: ReactElement | null;
  legend: ReactElement | null;
}

/**
 * Validates that all the children inside Plot are supported and organizes them by kind.
 */
export function splitChildren(children: ReactNode): PlotChildren {
  let topAxis = null;
  let rightAxis = null;
  let bottomAxis = null;
  let leftAxis = null;

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
      switch (child.props.position) {
        case 'top': {
          if (topAxis !== null) {
            throw new Error('Plot can only have one top axis');
          }
          topAxis = child;
          break;
        }
        case 'right': {
          if (rightAxis !== null) {
            throw new Error('Plot can only have one right axis');
          }
          rightAxis = child;
          break;
        }
        case 'bottom': {
          if (bottomAxis !== null) {
            throw new Error('Plot can only have one bottom axis');
          }
          bottomAxis = child;
          break;
        }
        case 'left': {
          if (leftAxis !== null) {
            throw new Error('Plot can only have one left axis');
          }
          leftAxis = child;
          break;
        }
        default:
          throw new Error('unreachable');
      }
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
    topAxis,
    rightAxis,
    bottomAxis,
    leftAxis,
    topHeading,
    bottomHeading,
    legend,
    seriesAndAnnotations,
  };
}
