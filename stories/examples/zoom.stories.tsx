import { Meta } from '@storybook/react';
import { useRef, useState } from 'react';

import {
  Axis,
  LineSeries,
  Plot,
  Annotations,
  SeriesPoint,
  ScatterSeries,
} from '../../src';
import { DirectedEllipse } from '../../src/components/Annotations/DirectedEllipse';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/Zoom',
} as Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];

interface HorizontalPositions {
  position?: {
    x1: number;
    x2: number;
  } | null;
  min?: number;
  max?: number;
}

export function HorizontalZoom() {
  const [{ position, min, max }, setPositions] =
    useState<HorizontalPositions | null>({
      position: null,
      min: undefined,
      max: undefined,
    });
  let click = useRef<boolean>(false);
  return (
    <div>
      <Plot
        {...DEFAULT_PLOT_CONFIG}
        onMouseDown={({ coordinates: { x } }) => {
          setPositions({
            position: {
              x1: x,
              x2: x,
            },
            min: min,
            max: max,
          });
          click.current = true;
        }}
        onMouseUp={() => {
          click.current = false;
          if (position.x1 !== position.x2) {
            setPositions({
              position: null,
              min: Math.min(position.x1, position.x2),
              max: Math.max(position.x1, position.x2),
            });
          }
        }}
        onMouseMove={({ coordinates: { x } }) => {
          if (click.current) {
            setPositions(({ position }) => ({
              position: {
                x1: position ? position.x1 : x,
                x2: x,
              },
              min: min,
              max: max,
            }));
          }
        }}
        onMouseLeave={() => {
          setPositions({
            position: null,
            min: min,
            max: max,
          });
          click.current = false;
        }}
        onDoubleClick={() => {
          setPositions({ min: undefined, max: undefined });
        }}
      >
        <LineSeries data={data} xAxis="x" yAxis="y" displayMarker />
        <Annotations>
          {position && (
            <Rectangle
              color="red"
              style={{ fillOpacity: 0.2, stroke: 'red' }}
              x1={position.x1}
              y1="540"
              x2={position.x2}
              y2="0"
            />
          )}
        </Annotations>
        <Axis min={min} max={max} id="x" position="bottom" label="time [s]" />
        <Axis id="y" position="left" />
      </Plot>
    </div>
  );
}
interface RectanglePositions {
  position?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
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
    x1: 38.313035023656056,
    x2: 26.21020600942245,
    y1: 21.884858262515774,
    y2: 32.167429590559586,
    width: 1.9780138610090512,
  },
};
export function RectangleZoom() {
  const {
    ellipse,
    data: { x, y },
  } = dataVertical;
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
    <div>
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
            setPositions(({ position }) => ({
              position: {
                x1: position ? position.x1 : x,
                y1: position ? position.y1 : y,
                x2: x,
                y2: y,
              },
              minX,
              maxX,
              minY,
              maxY,
            }));
          }
        }}
        onMouseLeave={() => {
          setPositions({
            position: null,
            minX,
            maxX,
            minY,
            maxY,
          });
          click.current = false;
        }}
        onDoubleClick={() => {
          setPositions({ minX: undefined, maxX: undefined });
        }}
      >
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
          <DirectedEllipse
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
    </div>
  );
}
