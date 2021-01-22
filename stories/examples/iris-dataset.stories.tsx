import { Meta } from '@storybook/react';
import { getClasses, getNumbers, getDistinctClasses } from 'ml-dataset-iris';
import { PCA as MlPCA } from 'ml-pca';
import LinearRegression from 'ml-regression-simple-linear';
import React, { ReactElement } from 'react';

import { LineSeries, Plot, ScatterSeries, Axis } from '../../src/index';
import type { Series } from '../../src/types';

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
          const x = predictedData.getColumn(0);
          const y = predictedData.getColumn(1);

          const regression = new LinearRegression(x, y);
          const yRegression = x.map((val: number) => regression.predict(val));

          let data: Series[] = new Array(x.length);
          let dataRegression: Series[] = new Array(x.length);
          for (let i = 0; i < x.length; i++) {
            data[i] = { x: x[i], y: y[i] };
            dataRegression[i] = { x: x[i], y: yRegression[i] };
          }

          series.push(
            <ScatterSeries
              xAxis="x"
              yAxis="y"
              key={klass}
              groupId={klass}
              data={data}
              label={klass}
              markerSize={2}
            />,
          );
          series.push(
            <LineSeries
              xAxis="x"
              yAxis="y"
              key={klass}
              groupId={klass}
              data={dataRegression}
              label={klass}
            />,
          );
        }

        const isXHidden = pcY !== 0 && pcY !== numFeatures - 1;
        const xPosition = pcY === 0 ? 'top' : 'bottom';

        const isYHidden = pcX !== 0 && pcX !== numFeatures - 1;
        const yPosition = pcX === 0 ? 'left' : 'right';

        children.push(
          <Plot
            key={`${pcX}-${pcY}`}
            width={size / numFeatures}
            height={size / numFeatures}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          >
            <Axis
              id="x"
              position={xPosition}
              padding={[0.05, 0.05]}
              hidden={isXHidden}
            />
            <Axis
              id="y"
              position={yPosition}
              padding={[0.05, 0.05]}
              hidden={isYHidden}
            />
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

PCA.storyName = 'Principal component analysis (PCA)';
