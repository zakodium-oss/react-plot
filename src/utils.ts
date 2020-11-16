import React from 'react';

import LineSeries from './components/LineSeries';
import type { PlotChildren } from './types';

export function getMax(actionMax: number, stateMax: number | null | undefined) {
  return stateMax === null || stateMax === undefined || stateMax <= actionMax
    ? actionMax
    : stateMax;
}

export function getMin(actionMin: number, stateMin: number | null | undefined) {
  return stateMin === null || stateMin === undefined || stateMin >= actionMin
    ? actionMin
    : stateMin;
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
