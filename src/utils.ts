import React from 'react';

import LineSeries from './components/LineSeries';
import type { PlotChildren } from './types';

let currentValue = 1;

export function getNextId() {
  return ++currentValue;
}

export function splitChildren(children: React.ReactNode[]): PlotChildren {
  let invalidChild = false;
  let lineSeries = [];
  for (let child of React.Children.toArray(children)) {
    // Base child validation
    if (typeof child !== 'object' || !React.isValidElement(child)) {
      invalidChild = true;
    }

    // Checks that is a line series component
    else if (child.type === LineSeries) {
      lineSeries.push(child);
    }

    // Default case
    else {
      invalidChild = true;
    }
  }
  return { invalidChild, lineSeries };
}
