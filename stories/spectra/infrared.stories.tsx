import type { Meta } from '@storybook/react-vite';

import {
  Annotations,
  Axis,
  Plot,
  useCrossHair,
  type UseCrossHairOptions,
} from '../../src/index.js';
import {
  DEFAULT_PLOT_CONFIG,
  getInfraredSeries,
  PlotControllerDecorator,
} from '../utils.js';

export default {
  title: 'Experimental spectra/Infrared',
  decorators: [PlotControllerDecorator],
  args: {
    color: 'black',
    horizontalAxisId: 'x',
    verticalAxisId: 'y',
    disabled: false,
  },
} satisfies Meta<UseCrossHairOptions>;

export function InfraredExample(props: UseCrossHairOptions) {
  const crossHair = useCrossHair(props);
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Annotations>{crossHair.annotations}</Annotations>
      <Axis id="x" position="bottom" label="Wavenumber [cm⁻¹]" flip />
      <Axis
        id="y"
        position="left"
        label="Transmittance [%]"
        paddingStart="10%"
        paddingEnd="10%"
      />
    </Plot>
  );
}
