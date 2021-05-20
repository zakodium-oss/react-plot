import Plot, { PlotProps } from './Plot';
import PlotObject from './PlotObject';
import * as Annotation from './components/Annotations/Annotation';
import Axis from './components/Axis/Axis';
import ParallelAxis from './components/Axis/ParallelAxis';
import BarSeries from './components/BarSeries';
import Heading from './components/Heading';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import RangeSeries from './components/RangeSeries';
import ScatterSeries from './components/ScatterSeries';

import type {
  AxisProps,
  ParallelAxisProps,
  HeadingProps,
  LegendProps,
  LineSeriesProps,
  BarSeriesProps,
  ScatterSeriesProps,
  SeriesPointType,
  RangeSeriesPointType,
  PlotObjectProps,
  PlotObjectType,
  RangeSeriesProps,
} from './types';

const { Annotations } = Annotation;

export {
  Annotation,
  Annotations,
  Plot,
  Axis,
  ParallelAxis,
  Heading,
  Legend,
  LineSeries,
  RangeSeries,
  ScatterSeries,
  PlotObject,
  BarSeries,
};
export type {
  PlotProps,
  AxisProps,
  ParallelAxisProps,
  HeadingProps,
  LegendProps,
  LineSeriesProps,
  BarSeriesProps,
  RangeSeriesProps,
  ScatterSeriesProps,
  SeriesPointType,
  RangeSeriesPointType,
  PlotObjectProps,
  PlotObjectType,
};
