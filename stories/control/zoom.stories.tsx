import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Axis, LineSeries, Plot, Annotations, SeriesPoint } from '../../src';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/Zoom',
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

interface Positions {
  x1: number;
  x2: number;
}

interface ZoomProps {
  data: SeriesPoint[];
  displayMarker?: boolean;
}
function Zoom({ data, displayMarker }: ZoomProps) {
  const [position, setPosition] = useState<Positions | null>(null);
  const [Click, setClick] = useState<boolean>(false);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  return (
    <div>
      <Plot
        {...DEFAULT_PLOT_CONFIG}
        onMouseDown={({ coordinates: { x } }) => {
          setPosition({
            x1: x,
            x2: x,
          });
          setClick(true);
        }}
        onMouseUp={() => {
          setPosition(null);
          setClick(false);
          setMin(Math.min(position.x1, position.x2));
          setMax(Math.max(position.x1, position.x2));
        }}
        onMouseMove={({ coordinates: { x } }) => {
          if (Click) {
            setPosition((position) => ({
              x1: position ? position.x1 : x,
              x2: x,
            }));
          }
        }}
      >
        <LineSeries
          data={data}
          xAxis="x"
          yAxis="y"
          displayMarker={displayMarker}
        />
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

export function ZoomExample() {
  return <Zoom data={data} displayMarker />;
}
