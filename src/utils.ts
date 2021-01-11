import React from 'react';

import Axis from './components/Axis';
import Heading from './components/Heading';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import type { PlotChildren } from './types';

let currentValue = 1;

export function getNextId() {
  return ++currentValue;
}

export function splitChildren(children: React.ReactNode): PlotChildren {
  let invalidChild = false;
  let series = [];
  let axis = [];
  let heading = null;
  let legend = null;
  for (let child of React.Children.toArray(children)) {
    // Base child validation
    if (typeof child !== 'object' || !React.isValidElement(child)) {
      invalidChild = true;
    }

    // Classifies the expected components
    else if (child.type === LineSeries || child.type === ScatterSeries) {
      series.push(child);
    } else if (child.type === Axis) {
      axis.push(child);
    } else if (child.type === Heading) {
      heading = child;
    } else if (child.type === Legend) {
      legend = child;
    }

    // Default case
    else {
      invalidChild = true;
    }
  }
  return { invalidChild, series, axis, heading, legend };
}

export function validatePosition(
  currPosition: string,
  position: string,
  id: string,
) {
  const horizontal = ['top', 'bottom'];
  const vertical = ['left', 'right'];
  const error =
    (horizontal.includes(currPosition) && !horizontal.includes(position)) ||
    (vertical.includes(currPosition) && !vertical.includes(position));
  if (error) {
    throw new Error(`The positions are not ortogonal for ${id}`);
  }
}
