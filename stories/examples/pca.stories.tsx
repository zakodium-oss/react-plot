import { Meta } from '@storybook/react';

import { Axis, Plot, Heading, ScatterSeries, Annotations } from '../../src';
import { Ellipse } from '../../src/components/Annotations/Ellipse';
import { Group } from '../../src/components/Annotations/Group';
import { Text } from '../../src/components/Annotations/Text';
import data from '../data/pca.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/PCA example',
} as Meta;
interface Point {
  x: number;
  y: number;
  color: {
    shape: string;
    fill: string;
    r: number;
  };
  id: string;
}
export function PCAExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading title="COVID-19 cases in USA (2020)" />
      <ScatterSeries
        markerStyle={{
          fill: (point: Point) => point.color.fill,
          stroke: 'none',
        }}
        data={data.points}
        xAxis="x"
        yAxis="y"
      />

      <Annotations>
        {data.ellipses.map(
          ({ x, y, rx, ry, fillColor, fillOpacity, label, angle }) => (
            <Group
              key={`${x}-${y}`}
              x={x}
              y={y}
              horizontalAlign="middle"
              verticalAlign="middle"
            >
              <Ellipse
                rx={rx}
                ry={ry}
                x="0"
                y="0"
                style={{
                  fill: fillColor,
                  opacity: fillOpacity,
                  transform: `rotate(${-angle}deg)`,
                }}
              />
              <Text
                x="0"
                y="0"
                style={{
                  fill: fillColor,
                  transform: `rotate(${-angle}deg)`,
                }}
              >
                {label}
              </Text>
            </Group>
          ),
        )}
      </Annotations>
      <Axis
        id="x"
        position="bottom"
        label="Week"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
      <Axis
        id="y"
        position="left"
        label="Number of cases"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
    </Plot>
  );
}
