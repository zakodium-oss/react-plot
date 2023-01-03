import { ReactNode, useState, useEffect } from 'react';
import { hydrate } from 'react-dom';
import { PlotObject, PlotObjectPlot } from 'react-plot';

import { Annotations, createSVG, Plot, ScatterSeries } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { DirectedEllipse } from '../src/components/Annotations/DirectedEllipse';
import infrared from '../stories/data/infrared.json';
import { DEFAULT_PLOT_CONFIG } from '../stories/utils';

interface ChildrenProps {
  children?: ReactNode;
}

export function DefaultPlotTest({ children }: ChildrenProps) {
  return <Plot {...DEFAULT_PLOT_CONFIG}>{children}</Plot>;
}
const plot: PlotObjectPlot = {
  dimensions: DEFAULT_PLOT_CONFIG,
  axes: [
    {
      type: 'main',
      position: 'bottom',
    },
    {
      type: 'main',
      position: 'left',
    },
  ],
  content: [
    {
      type: 'line',
      data: infrared,
    },
  ],
};
export function ServerSide() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const html = createSVG({ plot });
    const rootElement = document.getElementById('root');
    if (rootElement === null) throw new Error('Root element not found');
    rootElement.innerHTML = html;
    const result = hydrate(<PlotObject plot={plot} />, rootElement);
    setResult(result);
  });

  return result;
}
export function InfraredPlotTest({ children }: ChildrenProps) {
  return (
    <DefaultPlotTest>
      <ScatterSeries data={infrared} />
      {children}
    </DefaultPlotTest>
  );
}

export function AnnotationsCallback() {
  const [active, setActive] = useState('arrow');
  return (
    <InfraredPlotTest>
      <Annotations>
        <Arrow
          x1="0"
          x2="100"
          y1="0"
          y2="100"
          color={active === 'arrow' ? 'red' : 'black'}
          onClick={() => setActive('arrow')}
        />
        <DirectedEllipse
          x1="0"
          x2="3"
          y1="0"
          y2="4"
          width="5"
          color={active === 'directedEllipse' ? 'red' : 'black'}
          onClick={() => setActive('directedEllipse')}
        />
      </Annotations>
    </InfraredPlotTest>
  );
}
