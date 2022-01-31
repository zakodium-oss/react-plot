import { Meta } from '@storybook/react';
import { useRef, useState } from 'react';

import { Annotations, Axis, Legend, Plot } from '../../src';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import {
  FunctionSeries,
  FunctionSeriesProps,
} from '../../src/components/FunctionSeries';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/FunctionSeries',
  component: FunctionSeries,
  args: {
    xAxis: 'x',
  },
} as Meta<FunctionSeriesProps>;

function getY(x: number) {
  return 4 * Math.sin(2 * x);
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
export function Control(args: FunctionSeriesProps) {
  const [{ position, minX, maxX, minY, maxY }, setPositions] =
    useState<RectanglePositions | null>({
      position: null,
      minX: 0,
      maxX: 50,
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
          minX: 0,
          maxX: 50,
          minY: undefined,
          maxY: undefined,
        });
      }}
    >
      <Legend position="embedded" />
      <FunctionSeries
        getY={getY}
        {...args}
        xAxis="x"
        yAxis="y"
        label="y=4*sin(2*x)"
      />
      <Annotations>
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
        paddingStart={0.1}
        paddingEnd={0.1}
        id="x"
        position="bottom"
      />
      <Axis
        min={minY}
        max={maxY}
        id="y"
        position="left"
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}
