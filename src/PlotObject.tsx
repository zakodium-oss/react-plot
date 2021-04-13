import Plot from './Plot';
import Axis from './components/Axis';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import { PlotObjectProps } from './types';

export default function PlotObject({
  plot: {
    dimensions,
    svg,
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
      {axes.map((props) => (
        <Axis key={props.position} {...props} />
      ))}
      {legend !== undefined ? <Legend {...legend} /> : null}
      {series.map(({ type, ...props }, i) => {
        switch (type) {
          case 'line': {
            // eslint-disable-next-line react/no-array-index-key
            return <LineSeries key={`lineseries-${i}`} {...props} />;
          }
          case 'scatter': {
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
