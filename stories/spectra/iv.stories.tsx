import { Meta } from '@storybook/react';
import type { MeasurementSelector } from 'base-analysis';
import { Analysis, fromBreakdown, fromTransfer } from 'iv-analysis';
import { xyToXYObject } from 'ml-spectra-processing';
import { useEffect, useState } from 'react';

import { Annotation, Annotations, Axis, LineSeries, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Experimental spectra/IV',
} as Meta;

interface BaseExampleProps {
  filename: string;
  selector: MeasurementSelector;
  yScale: 'linear' | 'log';
  processorFunction(text: string): Analysis[];
  children(meta: any, data: Array<Record<'x' | 'y', number>>): React.ReactNode;
}
function BaseExample({
  filename,
  selector,
  yScale,
  processorFunction,
  children,
}: BaseExampleProps) {
  const [csv, setCsv] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetch(filename)
      .then((res) => res.text())
      .then((val) => setCsv(val))
      .catch((error) => setError(error));
  }, [filename]);

  if (error) return <div>Error: {error.message}</div>;
  if (!csv) return <div>Loading...</div>;

  const [analysis] = processorFunction(csv);
  const { variables, meta } = analysis.getMeasurementXY(selector);
  const y =
    yScale === 'log'
      ? variables.y.data.map((val: number) => Math.abs(val))
      : variables.y.data;
  const data = xyToXYObject({ x: variables.x.data, y });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'blue' }}
      />
      <Axis id="x" position="bottom" label={variables.x.label} />
      <Axis id="y" position="left" scale={yScale} label={variables.y.label} />
      <Annotations>{children(meta, data)}</Annotations>
    </Plot>
  );
}

export function TransferExample() {
  return (
    <BaseExample
      filename="/iv_transfer.csv"
      selector={{
        x: {
          units: 'V',
          label: 'Vg',
        },
        y: {
          units: 'A/mm',
          label: 'Id_dens',
        },
      }}
      yScale="log"
      processorFunction={fromTransfer}
    >
      {(meta, data) => {
        const thresholdVoltage = JSON.parse(meta.thresholdVoltage);
        const subthresholdSlope = JSON.parse(meta.subthresholdSlope);
        const { x: x1, y: y1 } = data[subthresholdSlope.fromIndex];
        const { x: x2, y: y2 } = data[subthresholdSlope.toIndex];
        const slope = subthresholdSlope.slope.value as number;
        const x = data[thresholdVoltage.index].x;
        return (
          <>
            <Annotation.Line
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
              color="green"
              strokeWidth="3"
            />
            <Annotation.Text x={x1 + 0.1} y={y1}>
              {(slope * 1000).toFixed(4)} mV/dec
            </Annotation.Text>
            <Annotation.Line
              x1={x}
              x2={x}
              y1="0%"
              y2="100%"
              color="red"
              strokeWidth="3"
            />
          </>
        );
      }}
    </BaseExample>
  );
}

export function BreakdownExample() {
  return (
    <BaseExample
      filename="/iv_breakdown.csv"
      selector={{
        x: {
          units: 'V',
          label: 'Vd',
        },
        y: {
          units: 'A/mm',
          label: 'Id_dens',
        },
      }}
      yScale="log"
      processorFunction={fromBreakdown}
    >
      {(meta, data) => {
        const thresholdVoltage = JSON.parse(meta.thresholdVoltage);
        const x = data[thresholdVoltage.index].x;
        return (
          <Annotation.Line
            x1={x}
            x2={x}
            y1="0%"
            y2="100%"
            color="red"
            strokeWidth="3"
          />
        );
      }}
    </BaseExample>
  );
}
