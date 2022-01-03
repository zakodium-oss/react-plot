import { Meta } from '@storybook/react';

import { Axis, Heading, HeadingProps, LineSeries, Plot } from '../../src';

enum Position {
  'bottom' = 'bottom',
  'top' = 'top',
}

export default {
  title: 'API/Heading',
  component: Heading,
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    position: Position.top,
  },
} as Meta;

const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

export function Control(props: HeadingProps) {
  return (
    <Plot
      width={900}
      height={540}
      seriesViewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 40,
        right: 40,
      }}
    >
      <Heading {...props} />
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}
