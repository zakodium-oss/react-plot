import { type ReactNode, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Annotation, Annotations, Plot, ScatterSeries } from '../src/index.js';
import infrared from '../stories/data/infrared.json';
import { DEFAULT_PLOT_CONFIG } from '../stories/utils.js';

interface ChildrenProps {
  children?: ReactNode;
}

export function DefaultPlotTest({ children }: ChildrenProps) {
  return <Plot {...DEFAULT_PLOT_CONFIG}>{children}</Plot>;
}
export function ServerSide() {
  const html = renderToStaticMarkup(<InfraredPlotTest />);
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
        <Annotation.Arrow
          x1="0"
          x2="100"
          y1="0"
          y2="100"
          color={active === 'arrow' ? 'red' : 'black'}
          onClick={() => setActive('arrow')}
        />
        <Annotation.DirectedEllipse
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
