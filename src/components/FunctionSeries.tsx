import { useMemo } from 'react';

import { usePlotContext } from '../contexts/plotContext';
import { SeriesPoint } from '../types';
import { toNumber } from '../utils';

import { LineSeries, LineSeriesProps } from './LineSeries';

export interface FunctionSeriesProps extends Omit<LineSeriesProps, 'data'> {
  getY: (x: number) => number;
  step?: number;
}

export function FunctionSeries(props: FunctionSeriesProps) {
  const { getY, step = 0.1, ...otherProps } = props;
  const {
    axisContext: { x },
    plotWidth,
  } = usePlotContext();
  const min = x ? toNumber(x.scale.invert(0)) : 0;
  const max = x ? toNumber(x.scale.invert(plotWidth)) : 0;
  const data = useMemo(() => {
    const data: SeriesPoint[] = [];
    for (let i = min; i <= max; i += step) {
      data.push({ x: i, y: getY(i) });
    }
    return data;
  }, [getY, max, min, step]);
  if (data.length > 0) {
    return <LineSeries data={data} {...otherProps} />;
  }
  return null;
}
