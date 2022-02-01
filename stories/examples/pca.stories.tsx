import { Meta } from '@storybook/react';
import { getDirectionalEllipse } from 'ml-directional-distribution';
import { useState, useRef, useMemo } from 'react';

import { Axis, Plot, Heading, ScatterSeries, Annotations } from '../../src';
import { DirectedEllipse } from '../../src/components/Annotations/DirectedEllipse';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { Text } from '../../src/components/Annotations/Text';
import data from '../data/pca2.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/PCA example of ecstasy',
} as Meta;
interface Point {
  label: string;
  x: number;
  y: number;
  color: string;
  id: string;
}
interface RectanglePositions {
  position?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
export function PCAExample() {
  const [{ position, minX, maxX, minY, maxY }, setPositions] =
    useState<RectanglePositions | null>({
      position: null,
      minX: undefined,
      maxX: undefined,
      minY: undefined,
      maxY: undefined,
    });
  let click = useRef<boolean>(false);
  const categories = [...new Set(data.map((datum) => datum.category))].map(
    (category) => ({
      label: category,
      color: data.find((datum) => datum.category === category).color,
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
        width: rMinor,
        color,
        label,
      };
    });
  }, [categories]);

  return (
    <Plot
      {...DEFAULT_PLOT_CONFIG}
      onMouseDown={({ coordinates: { x, y } }) => {
        setPositions({
          position: {
            x1: x,
            y1: y,
            x2: x,
            y2: y,
          },
          minX,
          maxX,
          minY,
          maxY,
        });
        click.current = true;
      }}
      onMouseUp={() => {
        click.current = false;
        if (position.x1 !== position.x2) {
          setPositions({
            position: null,
            minX: Math.min(position.x1, position.x2),
            maxX: Math.max(position.x1, position.x2),
            minY: Math.min(position.y1, position.y2),
            maxY: Math.max(position.y1, position.y2),
          });
        }
      }}
      onMouseMove={({ coordinates: { x, y } }) => {
        if (click.current) {
          setPositions((positions) => ({
            ...positions,
            position: {
              x1: position ? position.x1 : x,
              y1: position ? position.y1 : y,
              x2: x,
              y2: y,
            },
          }));
        }
      }}
      onMouseLeave={() => {
        setPositions((positions) => ({ ...positions, position: null }));
        click.current = false;
      }}
      onDoubleClick={() => {
        setPositions({
          minX: undefined,
          maxX: undefined,
          minY: undefined,
          maxY: undefined,
        });
      }}
    >
      <Heading title="Principal component analysis of XTC infrared spectra" />
      <ScatterSeries
        markerStyle={{
          fill: (point: Point) => point.color,
          stroke: 'none',
        }}
        pointLabelStyle={{
          fontSize: '12px',
          fill: (point: Point) => point.color,
          transform: 'translate(3px, -3px)',
        }}
        pointLabel={(point: Point) => point.label}
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
        {position && (
          <Rectangle
            color="red"
            style={{ fillOpacity: 0.2, stroke: 'red' }}
            x1={position.x1}
            y1={position.y1}
            x2={position.x2}
            y2={position.y2}
          />
        )}
      </Annotations>
      <Axis
        min={minX}
        max={maxX}
        id="x"
        position="bottom"
        label="PC 1"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
      <Axis
        min={minY}
        max={maxY}
        id="y"
        position="left"
        label="PC 2"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
    </Plot>
  );
}
