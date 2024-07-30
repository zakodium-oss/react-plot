import { Meta } from '@storybook/react';

import { Axis, Heading, HeadingProps, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

enum Position {
  'bottom' = 'bottom',
  'top' = 'top',
}

export default {
  title: 'API/Heading',
  component: Heading,
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    position: Position.top,
  },
} satisfies Meta;

export function Control(props: HeadingProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading {...props} />
      {getInfraredSeries()}
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}
