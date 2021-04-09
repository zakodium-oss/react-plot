import Plot, { PlotProps } from './Plot';
import PlotObject from './PlotObject';
import * as Annotation from './components/Annotations/Annotation';
import Axis from './components/Axis';
import BarSeries from './components/BarSeries';
import Heading from './components/Heading';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import RangeSeries from './components/RangeSeries';
import ScatterSeries from './components/ScatterSeries';
import Tracking from './components/Tracking';
import type {
  AxisProps,
  HeadingProps,
  LegendProps,
  LineSeriesProps,
  ScatterSeriesProps,
  SeriesPointType,
  RangeSeriesPointType,
  PlotObjectProps,
  PlotObjectType,
  RangeSeriesProps,
  TrackingProps,
} from './types';

const { Annotations } = Annotation;

export {
  Annotation,
  Annotations,
  Plot,
  Axis,
  Heading,
  Legend,
  LineSeries,
  RangeSeries,
  ScatterSeries,
  PlotObject,
  BarSeries,
  Tracking,
};
export type {
  PlotProps,
  AxisProps,
  HeadingProps,
  LegendProps,
  LineSeriesProps,
  RangeSeriesProps,
  ScatterSeriesProps,
  SeriesPointType,
  RangeSeriesPointType as SeriesRangePointType,
  TrackingProps,
  PlotObjectProps,
  PlotObjectType,
};
