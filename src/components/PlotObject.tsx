/* eslint-disable react/no-array-index-key */
import { CSSProperties, ReactNode } from 'react';

import type { Margins } from '../types';

import { Annotations, Annotation } from './Annotations/Annotation';
import type { AnnotationArrowProps } from './Annotations/Arrow';
import type { AnnotationCircleProps } from './Annotations/Circle';
import type { AnnotationEllipseProps } from './Annotations/Ellipse';
import type { AnnotationGroupProps } from './Annotations/Group';
import type { AnnotationLineProps } from './Annotations/Line';
import type { AnnotationRectangleProps } from './Annotations/Rectangle';
import type { AnnotationShapeProps } from './Annotations/Shape';
import type { AnnotationTextProps } from './Annotations/Text';
import { Axis, AxisProps } from './Axis/Axis';
import { ParallelAxis, ParallelAxisProps } from './Axis/ParallelAxis';
import { Legend, LegendProps } from './Legend';
import { LineSeries, LineSeriesProps } from './LineSeries';
import { Plot, PlotProps } from './Plot';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';

export type AnnotationsType =
  // This for each annotation option
  | ({ type: 'arrow' } & AnnotationArrowProps)
  | ({ type: 'circle' } & AnnotationCircleProps)
  | ({ type: 'ellipse' } & AnnotationEllipseProps)
  | ({ type: 'line' } & AnnotationLineProps)
  | ({ type: 'rectangle' } & AnnotationRectangleProps)
  | ({ type: 'shape' } & AnnotationShapeProps)
  | ({ type: 'text'; children: string } & Omit<AnnotationTextProps, 'children'>)
  // Group of annotations only
  | ({ type: 'group'; children: AnnotationsType[] } & Omit<
      AnnotationGroupProps,
      'children'
    >);

type ContentType =
  | { type: 'annotation'; children: AnnotationsType[] }
  // Different series
  | ({ type: 'line' } & LineSeriesProps)
  | ({ type: 'scatter' } & ScatterSeriesProps);

export interface PlotObjectPlot {
  axes: Array<
    ({ type: 'main' } & AxisProps) | ({ type: 'secondary' } & ParallelAxisProps)
  >;
  content: ContentType[];
  legend?: LegendProps;
  dimensions: {
    width: number;
    height: number;
    margin?: Partial<Margins>;
  };
  svg?: Pick<
    PlotProps,
    | 'plotViewportStyle'
    | 'seriesViewportStyle'
    | 'onClick'
    | 'onMouseMove'
    | 'onMouseEnter'
    | 'onMouseLeave'
  > & {
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

function annotationMap(annotationProps: AnnotationsType, index: number) {
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
