import { Children, isValidElement, ReactNode } from 'react';

import { Annotations } from '../components/Annotations/Annotation';
import Axis from '../components/Axis';
import ParallelAxis from '../components/Axis/ParallelAxis';
import BarSeries from '../components/BarSeries';
import Heading from '../components/Heading';
import Legend from '../components/Legend';
import LineSeries from '../components/LineSeries';
import RangeSeries from '../components/RangeSeries';
import ScatterSeries from '../components/ScatterSeries';
import { PlotChildren } from '../types';

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
