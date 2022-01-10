import { Meta } from '@storybook/react';

import { Annotations, Axis, BarSeries, LineSeries, Plot } from '../../src';
import { Group } from '../../src/components/Annotations/Group';
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
export function AdvancedMassExample(props: { min?: number; max?: number }) {
  const { min, max } = props;
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
          <Group key={peak.label} x={peak.x} y={peak.y}>
            <Line
              x1="0"
              x2="0"
              y1="0"
              y2="-5"
              style={{ strokeWidth: 2, stroke: 'blue' }}
            />
            <Text style={{ fontSize: '13px', fontWeight: '600' }} x="2" y="0">
              {peak.shortLabel}
            </Text>
            <Text style={{ fontSize: '13px', fontWeight: '600' }} x="2" y="-14">
              {peak.x.toFixed(4)}
            </Text>
          </Group>
        ))}
      </Annotations>
      <Axis
        displayPrimaryGridLines
        min={min}
        max={max}
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

AdvancedMassExample.args = { min: 10310, max: 10355 };
