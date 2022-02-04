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

import { useStartMoveEnd } from './useStartMoveEnd';

export interface UseAxisZoomOptions {
  direction?: 'horizontal' | 'vertical';
  axisId?: string;
  color?: CSSProperties['stroke'];
  rectangleStyle?: CSSProperties;
  lineStyle?: CSSProperties;
}

export function useAxisZoom(options: UseAxisZoomOptions = {}) {
  const {
    direction = 'horizontal',
    axisId = 'x',
    color = 'red',
    rectangleStyle,
    lineStyle,
  } = options;

  const plotControls = usePlotControls();

  const startMoveEnd = useStartMoveEnd({
    onEnd(data) {
      const start = startMoveEnd.start.clampedCoordinates[axisId];
      const end = data.clampedCoordinates[axisId];
      if (start === end) {
        return;
      }
      plotControls.setAxis(axisId, {
        min: Math.min(start, end),
        max: Math.max(start, end),
      });
    },
  });

  usePlotEvents({
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxis(axisId);
    },
  });

  if (!startMoveEnd?.end) {
    return null;
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
        <Rectangle x1="0" x2="100%" y1={start} y2={end} />
        <Line x1="0" x2="100%" y1={end} y2={end} {...lineProps} />
      </>
    );
  }

  return { annotations };
}
