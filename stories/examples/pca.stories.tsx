import { Meta } from '@storybook/react';
import { useState, useRef } from 'react';

import { Axis, Plot, Heading, ScatterSeries, Annotations } from '../../src';
import { Ellipse } from '../../src/components/Annotations/Ellipse';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { Text } from '../../src/components/Annotations/Text';
import { Shape } from '../../src/types';
import data from '../data/pca.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/PCA example of ecstasy',
} as Meta;
interface Point {
  x: number;
  y: number;
  color: {
    shape: Shape;
    fill: string;
    r: number;
  };
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
          fill: (point: Point) => point.color.fill,
          stroke: 'none',
        }}
        markerShape={(point: Point) => point.color.shape}
        pointLabel={(point: Point) => point.id}
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
