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

export function camelToKebab(string: string) {
  return string
    .replace(
      /(?<lower>[a-z0-9]|(?=[A-Z]))(?<upper>[A-Z])/g,
      '$<lower>-$<upper>',
    )
    .toLowerCase();
}
