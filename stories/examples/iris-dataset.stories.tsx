import { Meta } from '@storybook/react';
import { getClasses, getNumbers, getDistinctClasses } from 'ml-dataset-iris';
import { PCA as MlPCA } from 'ml-pca';
import LinearRegression from 'ml-regression-simple-linear';
import React, { ReactElement } from 'react';

import { Series } from '../../src/types';
import { LineSeries, Plot, ScatterSeries, XAxis, YAxis } from '../../src/index';

export default {
  title: 'Examples/Iris dataset',
} as Meta;

const dataset = getNumbers();
const numFeatures = dataset[0].length;
const classes = getClasses();
const distinctClasses = getDistinctClasses();

export function PCA() {
  const size = 800;
  const pca = new MlPCA(dataset);
  const explainedVariance = pca.getExplainedVariance();
  const predicted = pca.predict(dataset);

  const children = [];
  for (let pcY = 0; pcY < numFeatures; pcY++) {
    for (let pcX = 0; pcX < numFeatures; pcX++) {
      if (pcY === pcX) {
        children.push(
          <div
            key={`${pcX}-${pcY}`}
            B
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>PC {pcY + 1}</div>
            <div>{Math.round(explainedVariance[pcY] * 10000) / 100}</div>
          </div>,
        );
      } else {
        const series: ReactElement[] = [];

        for (const klass of distinctClasses) {
          const indices = [];
          for (let i = 0; i < classes.length; i++) {
            if (classes[i] === klass) {
              indices.push(i);
            }
          }

          const predictedData = predicted.selection(indices, [pcX, pcY]);
          const x = predictedData.getColumn(0);
          const y = predictedData.getColumn(1);

          let data: Series[] = new Array(x.length);
          for (let i = 0; i < x.length; i++) {
            data[i] = { x: x[i], y: y[i] };
          }
          const regression = new LinearRegression(data.x, data.y);
          const yRegression = data.x.map((x: number) => regression.predict(x));

          series.push(
            <ScatterSeries
              key={klass}
              data={data}
              label={klass}
              markerSize={2}
            />,
          );
          series.push(
            <LineSeries
              key={klass}
              data={{ x: data.x, y: yRegression }}
              label={klass}
            />,
          );
        }

        children.push(
          <Plot
            key={`${pcX}-${pcY}`}
            width={size / numFeatures}
            height={size / numFeatures}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis paddingLeft={0.05} paddingRight={0.05} display={false} />
            <YAxis paddingTop={0.05} paddingBottom={0.05} display={false} />
            {series}
          </Plot>,
        );
      }
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
        fontFamily: 'Arial, Helvetica, sans-serif',
        width: 800,
        height: 800,
      }}
    >
      {children}
    </div>
  );
}
