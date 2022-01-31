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
  const data = useMemo(() => {
    const data: SeriesPoint[] = [];
    if (x) {
      const isHorizontal = x
        ? x.position === 'top' || x.position === 'bottom'
        : undefined;
      const end = isHorizontal ? plotWidth : plotHeight;
      const scale = x?.scale;
      for (let i = 0; i <= end; i += step) {
        const x = toNumber(scale.invert(i));
        data.push({
          x,
          y: getY(x),
        });
      }
      return data;
    }
    return [{ x: 0, y: 0 }];
  }, [getY, plotHeight, plotWidth, x]);
  return <LineSeries data={data} {...otherProps} />;
}
