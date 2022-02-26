import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import { Annotations } from '../components/Annotations/Annotation';
import { Axis } from '../components/Axis/Axis';
import { ParallelAxis } from '../components/Axis/ParallelAxis';
import { Heading } from '../components/Heading';
import { Legend } from '../components/Legend';
import { BarSeries } from '../components/Series/BarSeries';
import { FunctionSeries } from '../components/Series/FunctionSeries';
import { LineSeries } from '../components/Series/LineSeries';
import { RangeSeries } from '../components/Series/RangeSeries';
import { ScatterSeries } from '../components/Series/ScatterSeries';

interface PlotChildren {
  series: ReactElement[];
  annotations: ReactElement | null;
  topAxis: ReactElement | null;
  rightAxis: ReactElement | null;
  bottomAxis: ReactElement | null;
  leftAxis: ReactElement | null;
  heading: ReactElement | null;
  legend: ReactElement | null;
}

/**
 * Validates that all the children inside Plot are supported and organizes them by kind.
 */
export function splitChildren(children: ReactNode): PlotChildren {
  let topAxis: ReactElement | null = null;
  let rightAxis: ReactElement | null = null;
  let bottomAxis: ReactElement | null = null;
  let leftAxis: ReactElement | null = null;

  let parallelAxes: ReactElement[] = [];

  let heading: ReactElement | null = null;

  let legend: ReactElement | null = null;

  let series: ReactElement[] = [];

  let annotations: ReactElement | null = null;

  for (let child of Children.toArray(children)) {
    if (typeof child !== 'object' || !isValidElement(child)) {
      // eslint-disable-next-line no-console
      console.error('Invalid Plot child:', child);
      throw new Error('invalid Plot child');
    } else if (
      child.type === FunctionSeries ||
      child.type === LineSeries ||
      child.type === ScatterSeries ||
      child.type === RangeSeries ||
      child.type === BarSeries
    ) {
      series.push(child);
    } else if (child.type === Annotations) {
      annotations = child;
    } else if (child.type === Axis) {
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
    } else if (child.type === ParallelAxis) {
      if (parallelAxes.length === 2) {
        throw new Error('Plot can have at most two parallel axes');
      }
      parallelAxes.push(child);
    } else if (child.type === Heading) {
      if (heading !== null) {
        throw new Error('Plot can only have one Heading element');
      }
      heading = child;
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

  if (!bottomAxis && !topAxis) {
    bottomAxis = <Axis position="bottom" />;
  }

  if (!leftAxis && !rightAxis) {
    leftAxis = <Axis position="left" />;
  }

  for (const parallelAxis of parallelAxes) {
    const id = parallelAxis.props.id;
    if (topAxis?.props.id === id) {
      if (bottomAxis !== null) {
        throw new Error('Plot can only have one bottom axis');
      }
      bottomAxis = parallelAxis;
    }
    if (rightAxis?.props.id === id) {
      if (leftAxis !== null) {
        throw new Error('Plot can only have one left axis');
      }
      leftAxis = parallelAxis;
    }
    if (bottomAxis?.props.id === id) {
      if (topAxis !== null) {
        throw new Error('Plot can only have one top axis');
      }
      topAxis = parallelAxis;
    }
    if (leftAxis?.props.id === id) {
      if (rightAxis !== null) {
        throw new Error('Plot can only have one right axis');
      }
      rightAxis = parallelAxis;
    }
  }

  return {
    topAxis,
    rightAxis,
    bottomAxis,
    leftAxis,
    heading,
    legend,
    series,
    annotations,
  };
}
