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

export function splitChildren(children: React.ReactNode[]) {
  return React.Children.toArray(children).reduce<PlotChildren>(
    (prev, curr) => {
      // Base child validation
      if (typeof curr !== 'object' || !React.isValidElement(curr)) {
        return { invalidChild: true, lineSeries: prev.lineSeries };
      }

      // Checks that is a line series component
      if (curr.type === LineSeries) {
        return {
          invalidChild: prev.invalidChild,
          lineSeries: [...prev.lineSeries, curr],
        };
      }

      // Default case
      return { invalidChild: true, lineSeries: prev.lineSeries };
    },
    {
      invalidChild: false,
      lineSeries: [],
    },
  );
}
