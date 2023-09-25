import { useMemo } from 'react';

import { usePlotContext } from '../../contexts/plotContext';
import { BaseSeriesProps, CSSFuncProps, SeriesPoint } from '../../types';
import { toNumber, useId } from '../../utils';

import { LineSeries } from './LineSeries';

export interface FunctionSeriesProps extends BaseSeriesProps {
  getY: (x: number) => number;
  lineStyle?: CSSFuncProps<{ id: string }>;
}

export function FunctionSeries(props: FunctionSeriesProps) {
  const { getY, xAxis = 'x', id: propId, ...otherProps } = props;
  const id = `~${useId(propId, 'series')}`;
  const { axisContext, plotWidth, plotHeight } = usePlotContext();
  const x = axisContext[xAxis];
  const step = 1;
  const data = useMemo(() => {
    const data: SeriesPoint[] = [];
    if (x) {
      const isHorizontal = x
        ? x.position === 'top' || x.position === 'bottom'
        : false;
      const end = isHorizontal ? plotWidth : plotHeight;
      const scale = x.scale;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getY, x?.domain[0], x?.domain[1]]);
  return <LineSeries data={data} id={id} {...otherProps} />;
}
