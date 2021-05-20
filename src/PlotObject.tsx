/* eslint-disable react/no-array-index-key */
import Plot from './Plot';
import {
  Annotations,
  Arrow,
  Circle,
  Ellipse,
  Group,
  Line,
  Rectangle,
  Shape,
  Text,
} from './components/Annotations/Annotation';
import Axis from './components/Axis/Axis';
import ParallelAxis from './components/Axis/ParallelAxis';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import type { AnnotationsType, PlotObjectProps } from './types';

export default function PlotObject({
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
      return <Arrow key={`${type}-${index}`} {...props} />;
    }
    case 'circle': {
      const { type, ...props } = annotationProps;
      return <Circle key={`${type}-${index}`} {...props} />;
    }
    case 'ellipse': {
      const { type, ...props } = annotationProps;
      return <Ellipse key={`${type}-${index}`} {...props} />;
    }
    case 'line': {
      const { type, ...props } = annotationProps;
      return <Line key={`${type}-${index}`} {...props} />;
    }
    case 'rectangle': {
      const { type, ...props } = annotationProps;
      return <Rectangle key={`${type}-${index}`} {...props} />;
    }
    case 'shape': {
      const { type, ...props } = annotationProps;
      return <Shape key={`${type}-${index}`} {...props} />;
    }
    case 'text': {
      const { type, ...props } = annotationProps;
      return <Text key={`${type}-${index}`} {...props} />;
    }
    case 'group': {
      const { type, children, ...props } = annotationProps;
      return (
        <Group key={`${type}-${index}`} {...props}>
          {children.map(annotationMap)}
        </Group>
      );
    }
    default: {
      return null;
    }
  }
}
