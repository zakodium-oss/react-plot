import { Meta } from '@storybook/react';
// @ts-expect-error untyped module
import IsotopicDistribution from 'isotopic-distribution';
import { xyToXYObject } from 'ml-spectra-processing';
// @ts-expect-error untyped module
import { getBestPeaks } from 'ms-spectrum';
import { useMemo } from 'react';

import {
  Annotations,
  Axis,
  BarSeries,
  LineSeries,
  Plot,
  useAxisZoom,
  useAxisWheelZoom,
  usePlotControllerAxes,
  usePan,
} from '../../src';
import { Group } from '../../src/components/Annotations/Group';
import { Line } from '../../src/components/Annotations/Line';
import { Text } from '../../src/components/Annotations/Text';
import data from '../data/mass.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Experimental spectra/Mass',
  decorators: [PlotControllerDecorator],
  args: { disabled: false },
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
        paddingEnd="10%"
      />
    </Plot>
  );
}

interface Peak {
  label: string;
  x: number;
  y: number;
  shortLabel: string;
}

interface AdvancedMassExampleProps {
  mf: string;
  disabled: boolean;
}

export function AdvancedMassExample({
  mf,
  disabled,
}: AdvancedMassExampleProps) {
  const zoom = useAxisZoom({ disabled });
  useAxisWheelZoom({ disabled });
  usePan({ disabled });
  const { x } = usePlotControllerAxes();

  const { profile, centroid } = useMemo(() => {
    const isotopicDistribution = new IsotopicDistribution(mf, {
      ensureCase: true,
    });

    const profileXY = isotopicDistribution.getGaussian({
      maxValue: 100,
    });

    return {
      profile: xyToXYObject(profileXY),
      centroid: isotopicDistribution.getTable({
        maxValue: 100,
      }),
    };
  }, [mf]);

  const bestPeaks = useMemo(
    () =>
      getBestPeaks(centroid, {
        from: x?.min ?? Number.NEGATIVE_INFINITY,
        to: x?.max ?? Number.POSITIVE_INFINITY,
        limit: 5,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [centroid, x],
  );

  return (
    <div>
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries
          data={profile}
          lineStyle={{ stroke: 'green' }}
          xAxis="x"
          yAxis="y"
        />
        <BarSeries
          data={centroid}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'red' }}
        />
        <Annotations>
          {bestPeaks.map((peak: Peak) => (
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
              <Text
                style={{ fontSize: '13px', fontWeight: '600' }}
                x="2"
                y="-14"
              >
                {peak.x.toFixed(4)}
              </Text>
            </Group>
          ))}
          {zoom.annotations}
        </Annotations>
        <Axis
          displayPrimaryGridLines
          id="x"
          position="bottom"
          label="Mass [m/z]"
        />
        <Axis
          paddingEnd="40"
          displayPrimaryGridLines
          id="y"
          position="left"
          label="Relative intensity [%]"
        />
      </Plot>
    </div>
  );
}

AdvancedMassExample.args = { mf: 'HCys100OH' };
