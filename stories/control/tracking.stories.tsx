import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Axis,
  LineSeries,
  Plot,
  Annotations,
  SeriesPoint,
  usePlotEvents,
  Annotation,
  Legend,
} from '../../src';
import {
  ClosestInfoResult,
  ClosestMethods,
} from '../../src/components/Tracking';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'API/Tracking',
  decorators: [PlotControllerDecorator],
  component: Tracking,
  args: {
    method: 'euclidean',
    displayMarker: false,
  },
} as Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
];

interface TrackingProps {
  data: SeriesPoint[][];
  displayMarker?: boolean;
  method: ClosestMethods;
}
function Tracking({ data, displayMarker, method }: TrackingProps) {
  const [hover, setHover] = useState<{
    event: MouseEvent;
    closest: ClosestInfoResult;
  } | null>(null);
  usePlotEvents({
    onMouseMove({ getClosest, event }) {
      setHover({
        event,
        closest: getClosest(method),
      });
    },
    onMouseLeave() {
      setHover(null);
    },
  });

  const annotations = hover ? (
    <>
      {Object.entries(hover.closest).map(([id, info]) => (
        <Annotation.Shape
          key={id}
          shape="circle"
          x={info.point.x}
          y={info.point.y}
          size={5}
        />
      ))}
    </>
  ) : null;

  const infoDiv = hover ? (
    <div
      style={{
        position: 'fixed',
        left: hover.event.clientX + 10,
        top: hover.event.clientY + 10,
        borderStyle: 'solid',
        padding: '5px',
        backgroundColor: 'white',
      }}
    >
      <b>Closest point</b>
      {Object.keys(hover.closest).map((key) => (
        <p key={key}>
          <b>{hover.closest[key].label}</b>
          <span>
            {' x: '}
            {Math.round((hover.closest[key].point.x || 0) * 100) / 100}
          </span>
          <span>
            {' y: '}
            {Math.round((hover.closest[key].point.y || 0) * 100) / 100}
          </span>
        </p>
      ))}
    </div>
  ) : null;
  return (
    <div className="relative">
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <Legend position="embedded" />
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
        <Annotations>{annotations}</Annotations>
      </Plot>
      {infoDiv}
    </div>
  );
}

interface TrackingExampleProps {
  method: ClosestMethods;
}

export function TrackingExample(props: TrackingExampleProps) {
  return <Tracking data={[data]} displayMarker method={props.method} />;
}

export function TrackingBig(props: TrackingExampleProps) {
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
  return <Tracking data={[data1, data2]} method={props.method} />;
}
TrackingBig.storyName = 'Tracking on medium amount of data';
