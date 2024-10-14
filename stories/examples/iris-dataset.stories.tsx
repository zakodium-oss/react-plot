import type { Meta } from '@storybook/react';
import { getClasses, getDistinctClasses, getNumbers } from 'ml-dataset-iris';
import { PCA as MlPCA } from 'ml-pca';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { type ReactElement, useMemo } from 'react';

import {
  Axis,
  FunctionSeries,
  Plot,
  ScatterSeries,
  Series,
  type SeriesPoint,
} from '../../src/index.js';

export default {
  title: 'Examples/Iris dataset',
} satisfies Meta;

const dataset = getNumbers();
const numFeatures = dataset[0].length;
const classes = getClasses();
const distinctClasses = getDistinctClasses();

export function PCA() {
  const size = 800;
  const pca = new MlPCA(dataset);
  const explainedVariance = pca.getExplainedVariance();
  const predicted = pca.predict(dataset);

  const children = useMemo(() => {
    const children: ReactElement[] = [];
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
            const indices: number[] = [];
            for (let i = 0; i < classes.length; i++) {
              if (classes[i] === klass) {
                indices.push(i);
              }
            }

            const predictedData = predicted.selection(indices, [pcX, pcY]);
            const x = predictedData.getColumn(0);
            const y = predictedData.getColumn(1);

            const regression = new SimpleLinearRegression(x, y);

            const data: SeriesPoint[] = [];
            for (const [i, xValue] of x.entries()) {
              data.push({ x: xValue, y: y[i] });
            }

            series.push(
              <ScatterSeries
                key={`${klass}-Scatter`}
                xAxis="x"
                yAxis="y"
                id={`${klass}-Scatter`}
                data={data}
                label={`${klass}-Scatter`}
                markerShape="triangle"
              />,
              <FunctionSeries
                key={`${klass}-Function`}
                xAxis="x"
                yAxis="y"
                id={`${klass}-Function`}
                getY={(val: number) => regression.predict(val)}
                label={`${klass}-Function`}
              />,
            );
          }

          children.push(
            <Plot
              key={`${pcX}-${pcY}`}
              width={size / numFeatures}
              height={size / numFeatures}
            >
              <Axis id="x" position="bottom" hidden />
              <Axis
                id="y"
                position="left"
                paddingStart="5%"
                paddingEnd="5%"
                hidden
              />
              <Series>{series}</Series>
            </Plot>,
          );
        }
      }
    }
    return children;
  }, [explainedVariance, predicted]);

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
