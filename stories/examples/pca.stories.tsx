import { Meta } from '@storybook/react';

import { Axis, Plot, Heading, ScatterSeries, Annotations } from '../../src';
import { Ellipse } from '../../src/components/Annotations/Ellipse';
import { Text } from '../../src/components/Annotations/Text';
import data from '../data/pca.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/PCA example of ecstasy',
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
      <Heading title="Principal component analysis of XTC infrared spectra" />
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
            <g
              key={`${x}-${y}`}
              style={{
                transform: `rotate(${
                  (angle >= 90 || angle < -90 ? 180 : 0) - angle
                }deg)`,
                transformOrigin: 'center',
                transformBox: 'fill-box',
              }}
            >
              <Ellipse
                rx={rx}
                ry={ry}
                x={x}
                y={y}
                color={fillColor}
                style={{
                  opacity: fillOpacity,
                }}
              />
              <Text x={x} y={y} color={fillColor}>
                {label}
              </Text>
            </g>
          ),
        )}
      </Annotations>
      <Axis
        id="x"
        position="bottom"
        label="PC 1"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
      <Axis
        id="y"
        position="left"
        label="PC 2"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
    </Plot>
  );
}
