import Plot from './Plot';
import Axis from './components/Axis';
import ParallelAxis from './components/Axis/ParallelAxis';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import { PlotObjectProps } from './types';

export default function PlotObject({
  plot: {
    dimensions,
    svg = {},
    seriesViewportStyle,
    axes,
    series,
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
      {series.map((seriesProps, i) => {
        switch (seriesProps.type) {
          case 'line': {
            const { type, ...props } = seriesProps;
            // eslint-disable-next-line react/no-array-index-key
            return <LineSeries key={`lineseries-${i}`} {...props} />;
          }
          case 'scatter': {
            const { type, ...props } = seriesProps;
            // eslint-disable-next-line react/no-array-index-key
            return <ScatterSeries key={`scatterseries-${i}`} {...props} />;
          }
          default: {
            return null;
          }
        }
      })}
    </Plot>
  );
}
