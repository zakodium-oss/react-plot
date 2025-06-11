/* eslint-disable react/no-array-index-key */
import type { CSSProperties, ReactNode } from 'react';

import type { Margins } from '../types.js';

import type {
  AnnotationArrowProps,
  AnnotationCircleProps,
  AnnotationEllipseProps,
  AnnotationGroupProps,
  AnnotationLineProps,
  AnnotationRectangleProps,
  AnnotationShapeProps,
  AnnotationTextProps,
} from './Annotations/index.js';
import { Annotation, Annotations } from './Annotations/index.js';
import type { AxisProps } from './Axis/Axis.js';
import { Axis } from './Axis/Axis.js';
import type { ParallelAxisProps } from './Axis/ParallelAxis.js';
import { ParallelAxis } from './Axis/ParallelAxis.js';
import type { LegendProps } from './Legend.js';
import { Legend } from './Legend.js';
import type { PlotProps } from './Plot.js';
import { Plot } from './Plot.js';
import type { LineSeriesProps } from './Series/LineSeries.js';
import { LineSeries } from './Series/LineSeries.js';
import type { ScatterSeriesProps } from './Series/ScatterSeries.js';
import { ScatterSeries } from './Series/ScatterSeries.js';

export type PlotObjectAnnotations =
  // This for each annotation option
  | ({ type: 'arrow' } & AnnotationArrowProps)
  | ({ type: 'circle' } & AnnotationCircleProps)
  | ({ type: 'ellipse' } & AnnotationEllipseProps)
  | ({ type: 'line' } & AnnotationLineProps)
  | ({ type: 'rectangle' } & AnnotationRectangleProps)
  | ({ type: 'shape' } & AnnotationShapeProps)
  | ({ type: 'text'; children: string } & Omit<AnnotationTextProps, 'children'>)
  // Group of annotations only
  | ({ type: 'group'; children: PlotObjectAnnotations[] } & Omit<
      AnnotationGroupProps,
      'children'
    >);

type PlotObjectContent =
  | { type: 'annotation'; children: PlotObjectAnnotations[] }
  // Different series
  | ({ type: 'line' } & LineSeriesProps)
  | ({ type: 'scatter' } & ScatterSeriesProps);

export interface PlotObjectPlot {
  axes: Array<
    ({ type: 'main' } & AxisProps) | ({ type: 'secondary' } & ParallelAxisProps)
  >;
  content: PlotObjectContent[];
  legend?: LegendProps;
  dimensions: {
    width: number;
    height: number;
    margin?: Partial<Margins>;
  };
  svg?: Pick<PlotProps, 'plotViewportStyle' | 'seriesViewportStyle'> & {
    className?: string;
    id?: string;
    style?: PlotProps['svgStyle'];
  };
  colorScheme?: Iterable<string>;
  seriesViewportStyle?: CSSProperties;
}

export interface PlotObjectProps {
  plot: PlotObjectPlot;
  children?: ReactNode;
}

export function PlotObject({
  plot: {
    dimensions,
    svg = {},
    seriesViewportStyle,
    axes,
    content,
    legend,
    colorScheme,
  },
  children,
}: PlotObjectProps) {
  const {
    className: svgClassName,
    id: svgId,
    style: svgStyle,
    ...svgProps
  } = svg;
  return (
    <Plot
      colorScheme={colorScheme}
      seriesViewportStyle={seriesViewportStyle}
      {...dimensions}
      svgClassName={svgClassName}
      svgId={svgId}
      svgStyle={svgStyle}
      {...svgProps}
    >
      {axes.map((axisProps) => {
        switch (axisProps.type) {
          case 'main': {
            const { type, ...props } = axisProps;
            return <Axis key={axisProps.position} {...props} />;
          }
          case 'secondary': {
            const { type, ...props } = axisProps;
            return <ParallelAxis key={`secondary-${props.id}`} {...props} />;
          }
          default: {
            return null;
          }
        }
      })}
      {legend !== undefined ? <Legend {...legend} /> : null}
      {content.map((contentProps, i) => {
        switch (contentProps.type) {
          case 'line': {
            const { type, ...props } = contentProps;
            return <LineSeries key={`${type}-${i}`} {...props} />;
          }
          case 'scatter': {
            const { type, ...props } = contentProps;
            return <ScatterSeries key={`${type}-${i}`} {...props} />;
          }
          case 'annotation': {
            return (
              <Annotations key={`${contentProps.type}-${i}`}>
                {contentProps.children.map(annotationMap)}
              </Annotations>
            );
          }
          default: {
            return null;
          }
        }
      })}
      {children && <Annotations>{children}</Annotations>}
    </Plot>
  );
}

function annotationMap(annotationProps: PlotObjectAnnotations, index: number) {
  switch (annotationProps.type) {
    case 'arrow': {
      const { type, ...props } = annotationProps;
      return <Annotation.Arrow key={`${type}-${index}`} {...props} />;
    }
    case 'circle': {
      const { type, ...props } = annotationProps;
      return <Annotation.Circle key={`${type}-${index}`} {...props} />;
    }
    case 'ellipse': {
      const { type, ...props } = annotationProps;
      return <Annotation.Ellipse key={`${type}-${index}`} {...props} />;
    }
    case 'line': {
      const { type, ...props } = annotationProps;
      return <Annotation.Line key={`${type}-${index}`} {...props} />;
    }
    case 'rectangle': {
      const { type, ...props } = annotationProps;
      return <Annotation.Rectangle key={`${type}-${index}`} {...props} />;
    }
    case 'shape': {
      const { type, ...props } = annotationProps;
      return <Annotation.Shape key={`${type}-${index}`} {...props} />;
    }
    case 'text': {
      const { type, ...props } = annotationProps;
      return <Annotation.Text key={`${type}-${index}`} {...props} />;
    }
    case 'group': {
      const { type, children, ...props } = annotationProps;
      return (
        <Annotation.Group key={`${type}-${index}`} {...props}>
          {children.map(annotationMap)}
        </Annotation.Group>
      );
    }
    default: {
      return null;
    }
  }
}
