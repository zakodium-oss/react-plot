import { useMemo } from 'react';

import { usePlotContext } from '../contexts/plotContext';
import { SeriesPoint } from '../types';
import { toNumber } from '../utils';

import { LineSeries, LineSeriesProps } from './LineSeries';

export interface FunctionSeriesProps extends Omit<LineSeriesProps, 'data'> {
  data: (x: number) => number;
  step?: number;
}

export function FunctionSeries(props: FunctionSeriesProps) {
  const { data: oldData, step = 0.1, ...otherProps } = props;
  const {
    axisContext: { x },
    plotWidth,
  } = usePlotContext();
  const data = useMemo(() => {
    const min = x ? toNumber(x.scale.invert(0)) : 0;
    const max = x ? toNumber(x.scale.invert(plotWidth)) : 1;
    const data: SeriesPoint[] = [];
    for (let i = min; i < max; i += step) {
      data.push({ x: i, y: oldData(i) });
    }
    return data;
  }, [oldData, plotWidth, step, x]);
  if (data.length > 0) {
    return <LineSeries data={data} {...otherProps} />;
  }
  return null;
}
