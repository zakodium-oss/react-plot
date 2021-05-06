import { Meta } from '@storybook/react';

import { Plot, Heading, Legend, LineSeries, Axis } from '../src';

export default {
  title: 'Plot/General options',
  component: Plot,
  argTypes: {
    hiddenTicks: {
      defaultValue: false,
      control: 'boolean',
    },
    width: {
      defaultValue: 550,
      control: 'number',
    },
    height: {
      defaultValue: 500,
      control: 'number',
    },
    displayPlot: {
      defaultValue: true,
      control: 'boolean',
    },
    plotLabel: {
      defaultValue: 'Vg = 5V',
      control: 'text',
    },
    displayGridLines: {
      defaultValue: true,
      control: 'boolean',
    },
    headingPosition: {
      defaultValue: 'top',
      control: { type: 'select', options: ['top', 'bottom'] },
    },
    legendPosition: {
      defaultValue: 'right',
      control: { type: 'select', options: ['left', 'right'] },
    },
    hidden: {
      defaultValue: false,
      control: 'boolean',
    },
    xFlip: {
      defaultValue: false,
      control: 'boolean',
    },
    yFlip: {
      defaultValue: false,
      control: 'boolean',
    },
  },
} as Meta;

export function Control(props) {
  const {
    displayPlot,
    plotLabel,
    displayGridLines,
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
          displayMarker={false}
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
        displayMarker
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
        displayMarker
        markerShape="circle"
        label={plotLabel}
      />
      <Axis
        id="x"
        position="bottom"
        label="Drain voltage [V]"
        displayGridLines={displayGridLines}
        hidden={hidden}
        flip={xFlip}
        hiddenTicks={hiddenTicks}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        displayGridLines={displayGridLines}
        labelSpace={40}
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
        displayMarker={false}
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
        displayMarker
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis
        id="x"
        position="bottom"
        label="Drain voltage [V]"
        displayGridLines
        max={6.1 / factor}
        tickStyle={{ fontSize: '0.8rem' }}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        displayGridLines
        labelSpace={50}
        max={6.1 * factor}
        tickStyle={{ fontSize: '0.8rem' }}
      />
      <Legend position="right" />
    </Plot>
  );
}
