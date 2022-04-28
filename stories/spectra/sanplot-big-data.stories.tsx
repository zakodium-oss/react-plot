import { Meta } from '@storybook/react';
import { xNoiseSanPlot } from 'ml-spectra-processing';
import { useMemo } from 'react';

import {
  Axis,
  Heading,
  Legend,
  LineSeries,
  Plot,
  SeriesPoint,
} from '../../src';
import data from '../data/1h-spectrum.json';

export default {
  title: 'Sanplot',
} as Meta;

interface PlotData {
  positive: SeriesPoint[];
  negative: SeriesPoint[];
}
interface PlotChartPros {
  data: { sanPlot: PlotData; lines: PlotData };
  sign: 'positive' | 'negative';
  color: string;
  yLogBase: number;
  hideHeading?: boolean;
}

const yLogBase = 2;
const color = 'red';
export function SanPlotExample() {
  const processedData = useMemo(() => {
    return processSnapPlotData();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div style={{ display: 'block' }}>
        <PlotChart
          data={processedData}
          sign="positive"
          color={color}
          yLogBase={yLogBase}
        />
      </div>
      <div style={{ display: 'block', width: 180, height: 180 }}>
        <PlotChart
          data={processedData}
          sign="negative"
          color={color}
          yLogBase={yLogBase}
          hideHeading
        />
      </div>
    </div>
  );
}

function PlotChart({
  data,
  sign,
  color,
  yLogBase,
  hideHeading = false,
}: PlotChartPros) {
  return (
    <Plot width={180} height={220}>
      {!hideHeading && <Heading title="Sanplot" />}
      <LineSeries
        data={data.sanPlot?.[sign] || []}
        xAxis="x"
        yAxis="y"
        label={sign}
        lineStyle={{
          stroke: color,
          strokeWidth: 1.2,
        }}
        markerStyle={{
          fill: color,
          stroke: color,
        }}
      />
      <LineSeries
        data={data.lines?.[sign] || []}
        xAxis="x"
        yAxis="y"
        label="noise level"
        lineStyle={{
          stroke: 'blue',
          strokeWidth: 0.8,
          strokeDasharray: '3, 3',
        }}
        markerStyle={{
          fill: color,
          stroke: color,
        }}
      />
      <Axis
        id="x"
        label="Pt"
        position="bottom"
        tickLabelStyle={{ fontSize: '0.6rem' }}
        labelStyle={{ fontSize: '0.6rem' }}
      />
      <Axis
        id="y"
        label={`Intensity [Log${yLogBase}]`}
        position="left"
        tickLabelStyle={{ fontSize: '0.6rem' }}
        labelStyle={{ fontSize: '0.7rem' }}
      />
      <Legend position="embedded" bottom={5} right={60} />
    </Plot>
  );
}

function processSnapPlotData() {
  const input = prepare1DData(data?.spectra?.[0].data);

  const sanResult = xNoiseSanPlot(input);
  const sanPlot: any = {};
  const lines: any = {};
  for (const plotKey in sanResult.sanplot) {
    const { x, y } = sanResult.sanplot[plotKey];
    let result = new Array(x.length);
    for (let i = 0; i < x.length; i++) {
      result[i] = { x: x[i], y: y[i] };
    }
    sanPlot[plotKey] = result;
    lines[plotKey] = getLine(sanResult[plotKey], result, {
      yLogBase: 2,
    });
  }
  return { sanPlot, lines };
}

function prepare1DData(data: any) {
  const length = data.re.length;
  const jump = Math.floor(length / 307200) || 1;
  const array = new Float64Array((length / jump) >> 0);
  let index = 0;
  for (let i = 0; i < array.length; i += jump) {
    array[index++] = data.re[i];
  }
  return array;
}

function getLine(value: number, data: any, options: any) {
  const { log10, abs } = Math;
  const { yLogBase } = options;
  const first = data.length > 0 ? data[0].x : 0;
  const last = data.length > 0 ? data[data.length - 1].x : 0;
  const inLogScale = log10(abs(value)) / log10(yLogBase);
  return [
    { x: first, y: inLogScale },
    { x: last, y: inLogScale },
  ];
}
