import { useMemo } from 'react';

import { usePlotContext } from '../contexts/plotContext';
import { SeriesPoint } from '../types';
import { toNumber } from '../utils';

import { LineSeries, LineSeriesProps } from './LineSeries';

export interface FunctionSeriesProps extends Omit<LineSeriesProps, 'data'> {
  getY: (x: number) => number;
  xAxis?: string;
}

export function FunctionSeries(props: FunctionSeriesProps) {
  const { getY, xAxis = 'x', ...otherProps } = props;
  const {
    axisContext: { [xAxis]: x },
    plotWidth,
    plotHeight,
  } = usePlotContext();
  const step = 1;
  const isHorizontal = x
    ? x.position === 'top' || x.position === 'bottom'
    : undefined;
  const min = x ? toNumber(x.scale.invert(isHorizontal ? 0 : plotHeight)) : 0;
  const max = x ? toNumber(x.scale.invert(isHorizontal ? plotWidth : 0)) : 0;
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
