import { CSSProperties } from 'react';

import { AnnotationLineProps, Line } from '../components/Annotations/Line';
import {
  AnnotationRectangleProps,
  Rectangle,
} from '../components/Annotations/Rectangle';
import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';
import { useStartMoveEnd } from './useStartMoveEnd';

export interface UseAxisZoomOptions extends ControllerHookOptions {
  /**
   * Zoom direction
   * @default 'vertical'
   * */
  direction?: 'horizontal' | 'vertical';
  /**
   * Zoom axisId
   * @default 'x' if direction is horizontal
   *          'y' if direction is vertical
   * */
  axisId?: string;
  /**
   * Rectangle stroke color
   * @default "red"
   * */
  color?: CSSProperties['stroke'];
  /**
   * Rectangle style
   * */
  rectangleStyle?: CSSProperties;
  /**
   * Limit lines style
   * @default "red"
   * */
  lineStyle?: CSSProperties;
}

export function useAxisZoom(options: UseAxisZoomOptions = {}) {
  const {
    controllerId,
    direction = 'horizontal',
    axisId = direction === 'horizontal' ? 'x' : 'y',
    color = 'red',
    rectangleStyle,
    lineStyle,
  } = options;

  const plotControls = usePlotControls(options);

  const startMoveEnd = useStartMoveEnd({
    controllerId,
    onEnd(_, start, end) {
      const startCoord = start.clampedCoordinates[axisId];
      const endCoord = end.clampedCoordinates[axisId];
      if (startCoord === endCoord) {
        return;
      }
      plotControls.setAxis(axisId, {
        min: Math.min(startCoord, endCoord),
        max: Math.max(startCoord, endCoord),
      });
    },
  });

  usePlotEvents(
    {
      onDoubleClick({ event: { button } }) {
        if (button !== 0) return;
        plotControls.resetAxis(axisId);
      },
    },
    options,
  );

  if (!startMoveEnd?.end) {
    return { annotations: null };
  }

  const start = startMoveEnd.start.clampedCoordinates[axisId];
  const end = startMoveEnd.end.clampedCoordinates[axisId];

  const lineProps: Partial<AnnotationLineProps> = {
    color,
    strokeWidth: '2',
    style: lineStyle,
  };

  const rectangleProps: Partial<AnnotationRectangleProps> = {
    color,
    fillOpacity: 0.2,
    style: rectangleStyle,
  };

  let annotations;

  if (direction === 'horizontal') {
    annotations = (
      <>
        <Line x1={start} x2={start} y1="0" y2="100%" {...lineProps} />
        <Rectangle x1={start} x2={end} y1="0" y2="100%" {...rectangleProps} />
        <Line x1={end} x2={end} y1="0" y2="100%" {...lineProps} />
      </>
    );
  } else {
    annotations = (
      <>
        <Line x1="0" x2="100%" y1={start} y2={start} {...lineProps} />
        <Rectangle x1="0" x2="100%" y1={start} y2={end} {...rectangleProps} />
        <Line x1="0" x2="100%" y1={end} y2={end} {...lineProps} />
      </>
    );
  }

  return { annotations };
}
