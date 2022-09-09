import { ReactNode, useState } from 'react';

import { Annotations, Plot, ScatterSeries } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { DirectedEllipse } from '../src/components/Annotations/DirectedEllipse';
import infrared from '../stories/data/infrared.json';
import { DEFAULT_PLOT_CONFIG } from '../stories/utils';

export function InfraredPlotTest({
  children,
}: {
  children?: ReactNode | ReactNode[];
}) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <ScatterSeries data={infrared} />
      {children}
    </Plot>
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
