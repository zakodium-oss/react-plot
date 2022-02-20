import { Meta } from '@storybook/react';
import { getDirectionalEllipse } from 'ml-directional-distribution';
import { useMemo } from 'react';

import {
  Axis,
  Plot,
  Heading,
  ScatterSeries,
  Annotations,
  useRectangularZoom,
} from '../../src';
import { DirectedEllipse } from '../../src/components/Annotations/DirectedEllipse';
import { Text } from '../../src/components/Annotations/Text';
import data from '../data/pca2.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/PCA example of ecstasy',
  decorators: [PlotControllerDecorator],
} as Meta;

type Datum = typeof data[number];

export function PCAExample() {
  const zoom = useRectangularZoom();
  const categories = [...new Set(data.map((datum) => datum.category))].map(
    (category) => ({
      label: category,
      color: (data.find((datum) => datum.category === category) as Datum).color,
      x: data
        .filter((datum) => datum.category === category)
        .map((datum) => datum.x),
      y: data
        .filter((datum) => datum.category === category)
        .map((datum) => datum.y),
    }),
  );
  const ellipses = useMemo(() => {
    return categories.map((category) => {
      const { x, y, color, label } = category;
      const { rMinor, position, majorAxis } = getDirectionalEllipse(
        {
          x,
          y,
        },
        { nbSD: 3 },
      );
      const {
        point1: { x: x1, y: y1 },
        point2: { x: x2, y: y2 },
      } = majorAxis;
      return {
        x1,
        y1,
        x2,
        y2,
        ...position,
        width: rMinor * 2,
        color,
        label,
      };
    });
  }, [categories]);

  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading title="Principal component analysis of XTC infrared spectra" />
      <ScatterSeries
        markerStyle={{
          fill: (point) => point.color,
          stroke: 'none',
        }}
        pointLabelStyle={{
          fontSize: '12px',
          fill: (point) => point.color,
          transform: 'translate(3px, -3px)',
        }}
        pointLabel={(point) => point.label}
        data={data}
        xAxis="x"
        yAxis="y"
      />

      <Annotations>
        {ellipses.map(({ x1, y1, x2, y2, width, color, label, x, y }) => (
          <g key={`${x1}-${y1}-${x2}-${y2}`}>
            <DirectedEllipse
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              width={width}
              color={color}
              style={{
                opacity: '0.2',
              }}
            />
            <Text x={x} y={y} color={color}>
              {label}
            </Text>
          </g>
        ))}
        {zoom.annotations}
      </Annotations>
      <Axis
        id="x"
        position="bottom"
        label="PC 1"
        paddingEnd="10%"
        paddingStart="10%"
      />
      <Axis
        id="y"
        position="left"
        label="PC 2"
        paddingEnd="10%"
        paddingStart="10%"
      />
    </Plot>
  );
}
