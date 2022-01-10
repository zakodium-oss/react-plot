import { Meta } from '@storybook/react';

import { Annotations, Axis, BarSeries, LineSeries, Plot } from '../../src';
import { Line } from '../../src/components/Annotations/Line';
import { Text } from '../../src/components/Annotations/Text';
import advancedData from '../data/HCys100OH_0.01.json';
import data from '../data/mass.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Experimental spectra/Mass',
} as Meta;

export function MassExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <BarSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'blue' }}
      />
      <Axis id="x" position="bottom" label="Mass [m/z]" />
      <Axis
        id="y"
        position="left"
        label="Relative intensity [%]"
        paddingEnd={0.1}
      />
    </Plot>
  );
}
export function AdvancedMassExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={advancedData.profile}
        lineStyle={{ stroke: 'green' }}
        xAxis="x"
        yAxis="y"
      />
      <BarSeries
        data={advancedData.centroid}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red' }}
      />
      <Annotations>
        {advancedData.bestPeaks.map((peak) => (
          <>
            <Line
              key={peak.label}
              x1={peak.x}
              x2={peak.x}
              y1={peak.y}
              y2={peak.y + 2}
              style={{ stroke: 'blue' }}
            />
            <Text
              style={{ fontSize: '13px', fontWeight: '600' }}
              x={peak.x}
              y={peak.y}
            >
              {peak.shortLabel}
            </Text>
            <Text
              style={{ fontSize: '13px', fontWeight: '600' }}
              x={peak.x}
              y={peak.y + 3}
            >
              {peak.x.toFixed(4)}
            </Text>
          </>
        ))}
      </Annotations>
      <Axis
        displayPrimaryGridLines
        min={10310}
        id="x"
        position="bottom"
        label="Mass [m/z]"
      />
      <Axis
        displayPrimaryGridLines
        id="y"
        position="left"
        label="Relative intensity [%]"
        paddingEnd={0.1}
      />
    </Plot>
  );
}
