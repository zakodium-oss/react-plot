import { SeriesPoint } from '../types';

import { LineSeries, LineSeriesProps } from './LineSeries';

export interface FunctionSeriesProps extends Omit<LineSeriesProps, 'data'> {
  data: (x: number) => number;
  max: number;
  min: number;
  step?: number;
}

export function FunctionSeries(props: FunctionSeriesProps) {
  const { data: oldData, max, min, step = 0.1, ...otherProps } = props;
  const data: SeriesPoint[] = [];
  for (let i = min; i < max; i += step) {
    data.push({ x: i, y: oldData(i) });
  }
  return <LineSeries data={data} {...otherProps} />;
}
