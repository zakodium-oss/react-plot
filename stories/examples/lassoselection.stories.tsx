import { Meta } from '@storybook/react';
import pointInPolygon from 'point-in-polygon';
import { useState } from 'react';

import {
  Axis,
  Plot,
  Annotations,
  Annotation,
  ScatterSeries,
  SeriesPoint,
  useDrawPath,
  UseDrawPathOptions,
} from '../../src';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/Lasso Selection',
  decorators: [PlotControllerDecorator],
  args: { disabled: false },
} as Meta;

const dataVertical = {
  data: {
    x: [
      41.65220344378768, 31.70720578956972, 33.30950548471659,
      31.33769720430162, 28.25281982815516, 37.752184972997476,
      24.92979994612913, 35.760129386605975, 41.02771981296988,
      38.990485964487505, 33.17626957475648, 18.57102585623182,
      32.07524576416625, 27.150560211671532, 28.23145450754202,
    ],
    y: [
      17.916146293869627, 27.314946245802012, 22.811211005586614,
      27.065139928907016, 31.325263926243114, 22.235470124159626,
      33.28162380816969, 25.527755649002216, 21.392089488689994,
      22.405581897154782, 24.827226218966658, 37.95087110066071,
      27.998477981824877, 31.619825407656002, 31.72052982137236,
    ],
  },
  ellipse: {
    x1: 42.742977900524934,
    x2: 21.78026313255357,
    y1: 18.121175940226244,
    y2: 35.93111191284912,
    width: 3.42602050534316,
  },
};
export function LassoSelection({ disabled }: UseDrawPathOptions) {
  const [points, setPoints] = useState<SeriesPoint[]>([]);
  const path = useDrawPath({
    close: true,
    style: { fillOpacity: '0.2', stroke: 'black', strokeWidth: '2px' },
    onDraw(Newpoints) {
      if (Newpoints && Newpoints.length > 0) {
        setPoints(Newpoints);
      }
    },
    disabled,
  });
  const {
    ellipse,
    data: { x, y },
  } = dataVertical;
  return (
    <Plot {...DEFAULT_PLOT_CONFIG} width={600} height={600}>
      <ScatterSeries
        markerStyle={{
          fill: ({ x, y }: SeriesPoint) => {
            return pointInPolygon(
              [x, y],
              points.map(({ x, y }) => [x, y]),
            )
              ? 'black'
              : 'blue';
          },
          stroke: 'none',
        }}
        data={x.map((x, index) => ({ x, y: y[index] }))}
        xAxis="x"
        yAxis="y"
      />

      <Annotations>
        <Annotation.DirectedEllipse
          x1={ellipse.x1}
          x2={ellipse.x2}
          y1={ellipse.y1}
          y2={ellipse.y2}
          width={ellipse.width}
          color="blue"
          style={{
            opacity: '0.2',
          }}
        />
        {path.annotations}
      </Annotations>
      <Axis min={0} max={50} position="bottom" label="PC 1" />
      <Axis min={0} max={50} position="left" label="PC 2" />
    </Plot>
  );
}
