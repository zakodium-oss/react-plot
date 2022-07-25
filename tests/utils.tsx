import { useState } from 'react';

import { Annotations, Plot, ScatterSeries } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { BoxPlot } from '../src/components/Annotations/BoxPlot';
import { Circle } from '../src/components/Annotations/Circle';
import { DirectedEllipse } from '../src/components/Annotations/DirectedEllipse';
import { Ellipse } from '../src/components/Annotations/Ellipse';
import { Group } from '../src/components/Annotations/Group';
import { Line } from '../src/components/Annotations/Line';
import { Polygon } from '../src/components/Annotations/Polygon';
import { Polyline } from '../src/components/Annotations/Polyline';
import { Rectangle } from '../src/components/Annotations/Rectangle';
import { Shape } from '../src/components/Annotations/Shape';
import { Text } from '../src/components/Annotations/Text';
import infrared from '../stories/data/infrared.json';

export const DEFAULT_PLOT_CONFIG = {
  width: 900,
  height: 540,
};
export const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

export const rangeData = [
  {
    x: 1,
    y1: -3,
    y2: 4,
  },
  {
    x: 2,
    y1: -2,
    y2: 5,
  },
  {
    x: 3,
    y1: 2,
    y2: 10,
  },
  {
    x: 4,
    y1: 7,
    y2: 16,
  },
  {
    x: 5,
    y1: 12,
    y2: 22,
  },
];

export function getInfraredSeries() {
  return (
    <ScatterSeries
      data={infrared}
      lineStyle={{ stroke: '#777' }}
      xAxis="x"
      yAxis="y"
    />
  );
}
export function AnnotationsCallback() {
  const [active, setActive] = useState('arrow');
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Annotations>
        <Arrow
          x1="0"
          x2="100"
          y1="0"
          y2="100"
          color={active === 'arrow' ? 'red' : 'black'}
          onClick={() => setActive('arrow')}
        />
        <DirectedEllipse
          x1="0"
          x2="3"
          y1="0"
          y2="4"
          width="5"
          color={active === 'directedEllipse' ? 'red' : 'black'}
          onClick={() => setActive('directedEllipse')}
        />
      </Annotations>
    </Plot>
  );
}
export function AllAnnotations() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}

      <Annotations>
        <div>
          <span>uncommon annotation</span>
        </div>
        <Arrow x1="0" x2="3" y1="0" y2="4" />
        <Line x1="0" x2="3" y1="0" y2="4" />
        <Circle x="0" y="0" r="400" />
        <Ellipse x="0" y="0" rx="400" ry="500" />
        <BoxPlot
          y="50"
          q1="1500"
          q3="3000"
          width="30"
          min="1000"
          max="3500"
          median="2300"
        />
        <DirectedEllipse x1="0" x2="3" y1="0" y2="4" width="5" />
        <Polygon
          points={[
            { x: '20', y: '70' },
            { x: '2000', y: '8' },
          ]}
        />
        <Polyline
          points={[
            { x: '20', y: '70' },
            { x: '2000', y: '8' },
          ]}
        />
        <Rectangle x1="0" x2="3" y1="0" y2="4" />
        <Shape x="20" y="70" shape="diamond" size={20} />
        <Group x="3" y="0">
          <Text x="0" y="0">
            Hello, World!
          </Text>
        </Group>
      </Annotations>
    </Plot>
  );
}
