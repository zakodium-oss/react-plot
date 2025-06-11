import type { Meta } from '@storybook/react-vite';

import type { LegendPosition, VerticalPosition } from '../src/index.js';
import { Axis, Heading, Legend, LineSeries, Plot } from '../src/index.js';

const args = {
  hiddenTicks: false,
  width: 550,
  height: 500,
  displayPlot: true,
  plotLabel: 'Vg = 5V',
  displayPrimaryGridLines: true,
  headingPosition: 'top' as VerticalPosition,
  legendPosition: 'right' as LegendPosition,
  hidden: false,
  xFlip: false,
  yFlip: false,
};

export default {
  title: 'Plot/General options',
  component: Plot,
  args,
} satisfies Meta;

export function Control(props: typeof args) {
  const {
    displayPlot,
    plotLabel,
    displayPrimaryGridLines,
    width,
    height,
    headingPosition,
    legendPosition,
    hidden,
    xFlip,
    yFlip,
    hiddenTicks,
  } = props;

  return (
    <Plot width={width} height={height}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
        position={headingPosition}
      />
      {displayPlot && (
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
      )}
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
      <LineSeries
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 8 },
          { x: 4, y: 8 },
          { x: 5, y: 8 },
          { x: 6, y: 8 },
        ]}
        xAxis="x"
        yAxis="y"
        displayMarkers
        markerShape="circle"
        label={plotLabel}
      />
      <Axis
        id="x"
        position="bottom"
        label="Drain voltage [V]"
        displayPrimaryGridLines={displayPrimaryGridLines}
        hidden={hidden}
        flip={xFlip}
        hiddenTicks={hiddenTicks}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        displayPrimaryGridLines={displayPrimaryGridLines}
        hidden={hidden}
        flip={yFlip}
        hiddenTicks={hiddenTicks}
      />
      <Legend position={legendPosition} />
    </Plot>
  );
}

export function ScientificNotation() {
  const factor = 1000;
  return (
    <Plot width={550} height={500}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
      />
      <LineSeries
        data={[
          { x: 0 / factor, y: 0 * factor },
          { x: 1 / factor, y: 1 * factor },
          { x: 2 / factor, y: 2 * factor },
          { x: 3 / factor, y: 3 * factor },
          { x: 4 / factor, y: 3 * factor },
          { x: 5 / factor, y: 3 * factor },
        ]}
        xAxis="x"
        yAxis="y"
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarkers={false}
      />
      <LineSeries
        data={[
          { x: 1 / factor, y: 2 * factor },
          { x: 2 / factor, y: 4 * factor },
          { x: 3 / factor, y: 6 * factor },
          { x: 4 / factor, y: 6 * factor },
          { x: 5 / factor, y: 6 * factor },
          { x: 6 / factor, y: 6 * factor },
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
        max={6.1 / factor}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        displayPrimaryGridLines
        max={6.1 * factor}
      />
      <Legend position="right" />
    </Plot>
  );
}
