import { Meta } from '@storybook/react';
import React, { useState, useEffect } from 'react';

import { Axis, LineSeries, Plot, Heading } from '../../src';
import type { Series } from '../../src/types';
import srcData from '../data/nasdaq.json';

export default {
  title: 'Examples/Nasdaq',
  argTypes: {
    refreshFrequency: { defaultValue: 1, control: 'number' },
    step: { defaultValue: 1, control: 'number' },
    displayInterval: { defaultValue: 500, control: 'number' },
  },
} as Meta;

/** Util functions *****************/

const generateNewXY = (serie: Series, step: number): [number, number] => {
  const x = serie.x + step;
  const rand = Math.floor(Math.random() * 10);
  const y = rand % 2 === 0 ? serie.y + rand * 0.1 : serie.y - rand * 0.1; // generate a new Y by + or - a random value to the last point.y
  return [x, y];
};

const getLastData = (
  data: Array<Series>,
  displayInterval: number,
): Array<Series> => {
  const lastTimestamp = data[data.length - 1].x;
  const firstIndex = data.findIndex(
    (serie) => serie.x >= lastTimestamp - displayInterval,
  );
  const newVals = data.slice(firstIndex);
  return newVals;
};

/** Main Component *****************/

type Props = Record<string, number>;
export function NasdaqExample(props: Props) {
  const {
    refreshFrequency, // Page refresher frequency (s)
    step, // timestamp's step
    displayInterval, // interval to display (s)
  } = props;

  function PlotRefresher() {
    const [data, setData] = useState(srcData);

    useEffect(() => {
      const timer = setTimeout(() => {
        const [x, y] = generateNewXY(data[data.length - 1], step); // generate a new coordinates
        const newData = getLastData([...data, { x, y }], displayInterval); // get last 500s data
        setData(newData);
      }, refreshFrequency * 1000);
      return () => clearTimeout(timer);
    }, [data]);

    return (
      <Plot
        width={1400}
        height={540}
        margin={{ bottom: 70, left: 70, top: 50, right: 10 }}
        viewportStyle={{
          stroke: 'black',
          strokeWidth: 0.3,
        }}
      >
        <Heading title="Nasdaq values Simulation" />
        <LineSeries
          data={data}
          xAxis="x"
          yAxis="y"
          lineStyle={{ stroke: 'green', strokeWidth: 1.5 }}
        />
        <Axis id="x" position="bottom" label="Timestamp (s)" labelSpace={40} />
        <Axis
          id="y"
          position="left"
          label="Nasdaq value [USD]"
          labelSpace={50}
          showGridLines={true}
          padding={[0.1, 0.1]}
        />
      </Plot>
    );
  }
  return <PlotRefresher />;
}
