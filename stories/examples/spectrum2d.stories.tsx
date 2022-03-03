import { Meta } from '@storybook/react';
import { useMemo } from 'react';

import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  useRectangularZoom,
} from '../../src';
import data from '../data/spectrum2d.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/Spectrum 2D',
  decorators: [PlotControllerDecorator],
} as Meta;

export function Spectrum2D() {
  const zoom = useRectangularZoom();
  const lineSeriesList = useMemo(() => {
    const dataList = data.y.map((yArray) =>
      yArray.map((y, i) => ({
        x: data.x[i],
        y,
      })),
    );
    return dataList
      .map((data, i) => (
        <LineSeries
          lineStyle={{ stroke: 'black', fill: 'white' }}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          data={data}
          xShift={`${i * 5}`}
          yShift={`${-i * 5}`}
        />
      ))
      .reverse();
  }, []);
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {lineSeriesList}
      <Annotations>{zoom.annotations}</Annotations>
      <Axis
        id="x"
        position="bottom"
        label="P1"
        paddingEnd={`${(lineSeriesList.length - 1) * 5}`}
      />
      <Axis
        id="y"
        position="left"
        label="P2"
        hidden
        paddingStart="5%"
        paddingEnd="50%"
      />
    </Plot>
  );
}
