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
import Axis from './components/Axis';
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
            // eslint-disable-next-line react/no-array-index-key
            return <LineSeries key={`lineseries-${i}`} {...props} />;
          }
          case 'scatter': {
            const { type, ...props } = contentProps;
            // eslint-disable-next-line react/no-array-index-key
            return <ScatterSeries key={`scatterseries-${i}`} {...props} />;
          }
          case 'annotation': {
            return (
              <Annotations>
                {contentProps.children.map(annotationMap)}
              </Annotations>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </Plot>
  );
}

function annotationMap(annotationProps: AnnotationsType) {
  switch (annotationProps.type) {
    case 'arrow': {
      const { type, ...props } = annotationProps;
      return <Arrow {...props} />;
    }
    case 'circle': {
      const { type, ...props } = annotationProps;
      return <Circle {...props} />;
    }
    case 'ellipse': {
      const { type, ...props } = annotationProps;
      return <Ellipse {...props} />;
    }
    case 'line': {
      const { type, ...props } = annotationProps;
      return <Line {...props} />;
    }
    case 'rectangle': {
      const { type, ...props } = annotationProps;
      return <Rectangle {...props} />;
    }
    case 'shape': {
      const { type, ...props } = annotationProps;
      return <Shape {...props} />;
    }
    case 'text': {
      const { type, ...props } = annotationProps;
      return <Text {...props} />;
    }
    case 'group': {
      const { type, children, ...props } = annotationProps;
      return <Group {...props}>{children.map(annotationMap)}</Group>;
    }
    default: {
      return null;
    }
  }
}
