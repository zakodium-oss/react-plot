import { Decorator } from '@storybook/react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { LineSeries, PlotController } from '../src';

import infrared from './data/infrared.json';

export const DEFAULT_PLOT_CONFIG = {
  width: 900,
  height: 540,
  seriesViewportStyle: {
    stroke: 'black',
    strokeWidth: 0.3,
  },
};

export function getInfraredSeries() {
  return (
    <LineSeries
      data={infrared}
      lineStyle={{ stroke: '#777' }}
      xAxis="x"
      yAxis="y"
    />
  );
}

export const PlotControllerDecorator: Decorator = (Story) => (
  <PlotController>
    <Story />
  </PlotController>
);

export function TestErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallbackRender={(props) => {
        if (props.error) {
          return <div>{props.error.message}</div>;
        }
        return <div>Something went wrong</div>;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
