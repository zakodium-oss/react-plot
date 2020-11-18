import React from 'react';

import Heading from './components/Heading';
import LineSeries from './components/LineSeries';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import type { PlotChildren } from './types';

let currentValue = 1;

export function getNextId() {
  return ++currentValue;
}

export function splitChildren(children: React.ReactNode[]): PlotChildren {
  let invalidChild = false;
  let lineSeries = [];
  let axis = { x: null, y: null };
  let heading = null;
  for (let child of React.Children.toArray(children)) {
    // Base child validation
    if (typeof child !== 'object' || !React.isValidElement(child)) {
      invalidChild = true;
    }

    // Checks that is a line series component
    else if (child.type === LineSeries) {
      lineSeries.push(child);
    } else if (child.type === XAxis) {
      axis.x = child;
    } else if (child.type === YAxis) {
      axis.y = child;
    } else if (child.type === Heading) {
      heading = child;
    }

    // Default case
    else {
      invalidChild = true;
    }
  }
  return { invalidChild, lineSeries, axis, heading };
}
