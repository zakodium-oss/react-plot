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
  },
  argTypes: {
    method: {
      type: {
        name: 'enum',
        value: ['x', 'y', 'euclidean'],
      },
    },
  },
} as Meta;

interface TrackingProps {
  method: ClosestMethods;
}

const len = 100000;
let serie1: SeriesPoint[] = new Array(len);
let serie2: SeriesPoint[] = new Array(len);
for (let i = 0; i < len; i++) {
  serie1[i] = {
    x: i - 100,
    y: Math.abs(Math.sin((i * 4 * Math.PI) / len)),
  };
  serie2[i] = {
    x: i - 100,
    y: Math.abs(Math.cos((i * 4 * Math.PI) / len)),
  };
}
const data = [serie1, serie2];

export function Tracking(props: TrackingProps) {
  const { method } = props;

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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {Object.keys(hover.closest).map((key) => (
        <div key={key}>
          <b>{hover.closest[key].label}</b>
          <span>
            {' x: '}
            {Math.round((hover.closest[key].point.x || 0) * 100) / 100}
          </span>
          <span>
            {' y: '}
            {Math.round((hover.closest[key].point.y || 0) * 100) / 100}
          </span>
        </div>
      ))}
    </div>
  ) : null;
  return (
    <>
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <Legend position="embedded" />
        {data.map((subdata, i) => (
          <LineSeries
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={subdata}
            xAxis="x"
            yAxis="y"
            label={`Series ${i + 1}`}
          />
        ))}
        <Axis id="x" position="bottom" label="time [s]" />
        <Axis id="y" position="left" />
        <Annotations>{annotations}</Annotations>
      </Plot>
      {infoDiv}
    </>
  );
}
