import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Axis,
  LineSeries,
  Plot,
  Annotation,
  Annotations,
  SeriesPoint,
} from '../../src';
import { ClosestInfoResult } from '../../src/components/Tracking';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/Tracking',
} as Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
];

interface Positions {
  coordinates: Record<string, number>;
  position: Record<'x' | 'y', number>;
}

interface TrackingProps {
  data: SeriesPoint[][];
  displayMarker?: boolean;
}
function Tracking({ data, displayMarker }: TrackingProps) {
  const [hover, setHover] = useState<Positions | null>(null);
  const [closest, setClosest] = useState<ClosestInfoResult | null>(null);

  return (
    <div>
      <Plot
        {...DEFAULT_PLOT_CONFIG}
        onMouseMove={({ coordinates, event: { pageX, pageY } }) => {
          setHover({ coordinates, position: { x: pageX, y: pageY } });
        }}
        onClick={({ getClosest }) => setClosest(getClosest('euclidean'))}
        onMouseLeave={() => setHover(null)}
      >
        {data.map((subdata, i) => (
          <LineSeries
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={subdata}
            xAxis="x"
            yAxis="y"
            displayMarker={displayMarker}
            label={`Series ${i + 1}`}
          />
        ))}
        <Axis id="x" position="bottom" label="time [s]" />
        <Axis id="y" position="left" />
        {closest && (
          <Annotations>
            {Object.entries(closest).map(([id, info]) => (
              <Annotation.Shape
                key={id}
                shape="circle"
                x={info.point.x}
                y={info.point.y}
                size={5}
              />
            ))}
          </Annotations>
        )}
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
      {closest && (
        <div>
          <b>Closest point</b>
          {Object.keys(closest).map((key) => (
            <p key={key}>
              <b>{closest[key].label}</b>
              <span>
                {' x: '}
                {Math.round((closest[key].point.x || 0) * 100) / 100}
              </span>
              <span>
                {' y: '}
                {Math.round((closest[key].point.y || 0) * 100) / 100}
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrackingExample() {
  return <Tracking data={[data]} displayMarker />;
}

export function TrackingBig() {
  const len = 100000;
  let data1: SeriesPoint[] = new Array(len);
  let data2: SeriesPoint[] = new Array(len);
  for (let i = 0; i < len; i++) {
    data1[i] = {
      x: i - 100,
      y: Math.abs(Math.sin((i * 4 * Math.PI) / len)),
    };
    data2[i] = {
      x: i - 100,
      y: Math.abs(Math.cos((i * 4 * Math.PI) / len)),
    };
  }
  return <Tracking data={[data1, data2]} />;
}
TrackingBig.storyName = 'Tracking on medium amount of data';
