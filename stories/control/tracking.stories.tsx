import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Axis, LineSeries, Plot, Tracking } from '../../src';

export default {
  title: 'API/Tracking',
  component: Tracking,
} as Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
];

const plot = {
  width: 900,
  height: 540,
  seriesViewportStyle: { stroke: 'black' },
};

interface Positions {
  coordinates: Record<string, number>;
  position: Record<'x' | 'y', number>;
}
export function TrackingControl() {
  const [hover, setHover] = useState<Positions>(null);
  return (
    <div>
      <Plot {...plot} margin={{ bottom: 45, left: 90, top: 40, right: 20 }}>
        <LineSeries data={data} xAxis="x" yAxis="y" displayMarker />
        <Axis id="x" position="bottom" label="time [s]" />
        <Axis id="y" position="left" labelSpace={65} />
        <Tracking
          onMouseMove={({ coordinates, event: { clientX, clientY } }) =>
            setHover({ coordinates, position: { x: clientX, y: clientY } })
          }
        />
      </Plot>
      {hover && (
        <div
          style={{
            position: 'absolute',
            left: hover.position.x + 5,
            top: hover.position.y + 5,
            borderStyle: 'solid',
            padding: '5px',
            backgroundColor: 'white',
          }}
        >
          <b>VALUES</b>
          {Object.keys(hover.coordinates).map((key) => (
            <div key={key}>
              {key}: {Math.round(hover.coordinates[key] * 100) / 100}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
