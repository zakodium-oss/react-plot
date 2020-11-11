import { Meta } from '@storybook/react';
import React from 'react';

import Plot from '../src/Plot';

export default {
  title: 'Example/Plot',
  component: Plot,
  argTypes: {
    rows: {
      defaultValue: '6',
      control: 'number',
    },
    columns: {
      defaultValue: '7',
      control: 'number',
    },
  },
} as Meta;

export function Control(props) {
  const pickedItems = [{ index: '3' }, { index: '5', label: 'owner' }];
  return (
    <Plot
      pickedItems={pickedItems}
      size={320}
      // eslint-disable-next-line no-console
      onSelect={console.log}
      {...props}
    />
  );
}
