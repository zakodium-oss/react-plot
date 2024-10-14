import type { Meta } from '@storybook/react';

import { Axis, Heading, Legend, LineSeries, Plot } from '../src/index.js';

export default {
  title: 'Plot/Axis boundaries',
  component: Plot,
  args: {
    width: 550,
    height: 500,
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
  },
} satisfies Meta;

type Props = Record<string, number>;
export function Control(props: Props) {
  const { width, height, xMin, xMax, yMax, yMin } = props;
  return (
    <Plot width={width} height={height}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
      />
      <LineSeries
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
        ]}
        xAxis="x"
        yAxis="y"
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarkers={false}
      />
      <LineSeries
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
        ]}
        xAxis="x"
        yAxis="y"
        displayMarkers
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis
        id="x"
        position="bottom"
        label="Drain voltage [V]"
        displayPrimaryGridLines
        min={xMin}
        max={xMax}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        displayPrimaryGridLines
        min={yMin}
        max={yMax}
      />
      <Axis id="y" position="right" label="Drain current [mA]" />
      <Axis id="x" position="top" />
      <Legend position="embedded" bottom={10} right={10} />
    </Plot>
  );
}
