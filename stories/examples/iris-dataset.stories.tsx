import { Meta } from '@storybook/react';
import { getClasses, getNumbers, getDistinctClasses } from 'ml-dataset-iris';
import { PCA as MlPCA } from 'ml-pca';
import React, { ReactElement } from 'react';

import { Plot, LineSeries, XAxis, YAxis } from '../../src/index';

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
          const data = {
            x: predictedData.getColumn(0),
            y: predictedData.getColumn(1),
          };

          series.push(
            <LineSeries
              key={klass}
              data={data}
              label={klass}
              lineStyle={{ strokeWidth: 0 }}
              markerSize={2}
              displayMarker
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
