import { Meta } from '@storybook/react';
import { IsotopicDistribution, getBestPeaks } from 'mass-tools';
import { xyToXYObject } from 'ml-spectra-processing';
import { useMemo, useRef, useState } from 'react';

import { Annotations, Axis, BarSeries, LineSeries, Plot } from '../../src';
import { Group } from '../../src/components/Annotations/Group';
import { Line } from '../../src/components/Annotations/Line';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { Text } from '../../src/components/Annotations/Text';
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

interface Positions {
  position?: {
    x1: number;
    x2: number;
  } | null;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}

interface AdvancedMassExampleProps {
  mf: string;
}
export function AdvancedMassExample({ mf }: AdvancedMassExampleProps) {
  const [{ position, minX, maxX, minY, maxY }, setPositions] =
    useState<Positions | null>({
      position: null,
      minX: undefined,
      maxX: undefined,
      minY: undefined,
      maxY: undefined,
    });
  let click = useRef<boolean>(false);
  // we calculate the 'profile' and 'centroid', this should be done only if `mf` is changing
  const isotopicDistribution = new IsotopicDistribution(mf, {
    ensureCase: true,
  });

  const profileXY = isotopicDistribution.getGaussian({
    maxValue: 100,
  });
  const profile = xyToXYObject(profileXY);

  const centroid = isotopicDistribution.getTable({
    maxValue: 100,
  });

  // calculating the bestPeaks should be done each time the zoom (from, to) is changing and should create the new annotations
  const bestPeaks = useMemo(
    () =>
      getBestPeaks(centroid, {
        from: minX,
        to: maxX,
        limit: 5,
        numberSlots: 10,
        threshold: 0.01,
      }),
    [centroid, maxX, minX],
  );

  return (
    <div>
      <Plot
        {...DEFAULT_PLOT_CONFIG}
        onMouseDown={({ coordinates: { x } }) => {
          setPositions({
            position: {
              x1: x,
              x2: x,
            },
            minX: minX,
            maxX: maxX,
          });
          click.current = true;
        }}
        onMouseUp={() => {
          click.current = false;
          if (position.x1 !== position.x2) {
            setPositions({
              position: null,
              minX: Math.min(position.x1, position.x2),
              maxX: Math.max(position.x1, position.x2),
            });
          }
        }}
        onMouseLeave={() => {
          setPositions({
            position: null,
            minX: minX,
            maxX: maxX,
            minY: minY,
            maxY: maxY,
          });
          click.current = false;
        }}
        onMouseMove={({ coordinates: { x } }) => {
          if (click.current) {
            setPositions(({ position }) => ({
              position: {
                x1: position ? position.x1 : x,
                x2: x,
              },
              minX: minX,
              maxX: maxX,
              minY: minY,
              maxY: maxY,
            }));
          }
        }}
        onDoubleClick={() => {
          setPositions({
            minX: undefined,
            maxX: undefined,
            minY: undefined,
            maxY: undefined,
          });
        }}
        onWheel={({ coordinates: { y1, y2 } }) => {
          setPositions((positions) => ({
            ...positions,
            minY: Math.min(y1, y2),
            maxY: Math.max(y1, y2),
          }));
        }}
      >
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
          {bestPeaks.map((peak) => (
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
          {position && (
            <Rectangle
              color="red"
              style={{ fillOpacity: 0.2, stroke: 'red' }}
              x1={position.x1}
              y1="540"
              x2={position.x2}
              y2="0"
            />
          )}
        </Annotations>
        <Axis
          paddingEnd={0.1}
          paddingStart={0.1}
          displayPrimaryGridLines
          min={minX}
          max={maxX}
          id="x"
          position="bottom"
          label="Mass [m/z]"
        />
        <Axis
          min={minY}
          max={maxY}
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
