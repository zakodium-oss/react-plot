import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Annotations, Axis, Plot } from '../../src';
import { Group } from '../../src/components/Annotations/Group';
import { Line } from '../../src/components/Annotations/Line';
import { Text } from '../../src/components/Annotations/Text';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

type Positions = Record<string, number>;

export default {
  title: 'Experimental spectra/Infrared',
} as Meta;

export function InfraredExample() {
  const [hover, setHover] = useState<Positions | null>(null);
  return (
    <Plot
      {...DEFAULT_PLOT_CONFIG}
      onMouseMove={({ coordinates }) => {
        setHover(coordinates);
      }}
      onMouseLeave={() => setHover(null)}
    >
      {getInfraredSeries()}
      {hover && (
        <Annotations>
          <Line x1="0%" x2="100%" y1={hover.y} y2={hover.y} />
          <Line y1="0%" y2="100%" x1={hover.x} x2={hover.x} />
          <Group
            x={hover.x}
            y={hover.y}
            horizontalAlign="end"
            verticalAlign="end"
          >
            <Text text-anchor="end" alignment-baseline="baseline" x="0" y="0">
              {hover.x.toFixed(2)} ,{hover.y.toFixed(2)}
            </Text>
          </Group>
        </Annotations>
      )}
      <Axis id="x" position="bottom" label="Wavenumber [cm⁻¹]" flip />
      <Axis
        id="y"
        position="left"
        label="Transmittance [%]"
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}
