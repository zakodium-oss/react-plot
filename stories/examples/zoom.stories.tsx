import type { Meta } from '@storybook/react-vite';

import {
  Annotation,
  Annotations,
  Axis,
  LineSeries,
  Plot,
  ScatterSeries,
  useAxisZoom,
  type UseAxisZoomOptions,
  useRectangularZoom,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils.js';

export default {
  title: 'Examples/Zoom',
  decorators: [PlotControllerDecorator],
  args: { disabled: false },
} satisfies Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];

export function HorizontalZoom({ disabled }: UseAxisZoomOptions) {
  const zoom = useAxisZoom({ disabled });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} displayMarkers />
      <Annotations>{zoom.annotations}</Annotations>
      <Axis position="bottom" label="time [s]" />
      <Axis position="left" />
    </Plot>
  );
}

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

export function RectangleZoom({ disabled }: UseAxisZoomOptions) {
  const zoom = useRectangularZoom({ disabled });
  const {
    ellipse,
    data: { x, y },
  } = dataVertical;
  return (
    <div>
      <Plot {...DEFAULT_PLOT_CONFIG} width={600} height={600}>
        <ScatterSeries
          markerStyle={{
            fill: 'blue',
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
          {zoom.annotations}
        </Annotations>
        <Axis min={0} max={50} position="bottom" label="PC 1" />
        <Axis min={0} max={50} position="left" label="PC 2" />
      </Plot>
    </div>
  );
}

export function SynchronizedZoom({ disabled }: UseAxisZoomOptions) {
  const zoom = useRectangularZoom({
    color: 'gold',
    style: {
      fillOpacity: 0.5,
    },
    disabled,
  });

  const {
    ellipse,
    data: { x, y },
  } = dataVertical;

  const series = (
    <ScatterSeries
      markerStyle={{
        fill: 'blue',
        stroke: 'none',
      }}
      data={x.map((x, index) => ({ x, y: y[index] }))}
      xAxis="x"
      yAxis="y"
    />
  );
  const ellipseAnnotation = (
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
  );

  const xAxis = <Axis min={0} max={50} position="bottom" label="PC 1" />;
  const yAxis = <Axis min={0} max={50} position="left" label="PC 2" />;

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Plot {...DEFAULT_PLOT_CONFIG} width={300} height={600}>
        {series}
        <Annotations>
          {ellipseAnnotation}
          {zoom.annotations}
        </Annotations>
        {xAxis}
        {yAxis}
      </Plot>
      <Plot {...DEFAULT_PLOT_CONFIG} width={600} height={300}>
        {series}
        <Annotations>
          {ellipseAnnotation}
          {zoom.annotations}
        </Annotations>
        {xAxis}
        {yAxis}
      </Plot>
    </div>
  );
}
