import { ReactNode, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Annotations, Plot, ScatterSeries } from '../src';
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
