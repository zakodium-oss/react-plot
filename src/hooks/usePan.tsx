import { useRef } from 'react';

import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { DualAxisOptions, ControllerHookOptions } from './types';

export interface UsePanOptions extends DualAxisOptions, ControllerHookOptions {}

export function usePan(options: UsePanOptions = {}) {
  const { horizontalAxisId = 'x', verticalAxisId = 'y' } = options;

  const click = useRef<boolean>(false);
  const plotControls = usePlotControls(options);

  // TODO : cursor state
  // const [cursor, setCursor] = useState<'' | 'grabbing' | 'grab'>('');
  usePlotEvents(
    {
      // onKeyDown({ event: { altKey } }) {
      //   if (altKey) {
      //     setCursor('grab');
      //   }
      // },
      // onKeyUp({ event: { altKey } }) {
      //   if (!altKey) {
      //     setCursor('');
      //   }
      // },
      onMouseDown() {
        // if (altKey) {
        //   setCursor('grabbing');
        // }
        click.current = true;
      },
      onMouseUp() {
        // if (altKey) {
        //   setCursor('grab');
        // }
        click.current = false;
      },
      onMouseMove({
        event: { altKey },
        movement: {
          [horizontalAxisId]: xMovement,
          [verticalAxisId]: yMovement,
        },
        domains: { [horizontalAxisId]: x, [verticalAxisId]: y },
      }) {
        if (!click.current || !altKey) return;
        plotControls.setAxes({
          [horizontalAxisId]: {
            min: x[0] - xMovement,
            max: x[1] - xMovement,
          },
          [verticalAxisId]: {
            min: y[0] - yMovement,
            max: y[1] - yMovement,
          },
        });
      },
      onDoubleClick({ event: { button } }) {
        if (button !== 0) return;
        plotControls.resetAxes([horizontalAxisId, verticalAxisId]);
      },
    },
    options,
  );
}
