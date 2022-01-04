import { LineSeries } from '../src';

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
