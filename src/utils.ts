import crypto from 'crypto';

import React from 'react';

import LineSeries from './components/LineSeries';
import type { PlotChildren } from './types';

export function randomString(len: number) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .substring(0, len)
    .toString();
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
