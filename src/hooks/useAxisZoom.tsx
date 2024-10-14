import type { CSSProperties } from 'react';

import {
  type AnnotationLineProps,
  Line,
} from '../components/Annotations/Line.js';
import {
  type AnnotationRectangleProps,
  Rectangle,
} from '../components/Annotations/Rectangle.js';
import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext.js';

import type { ControllerHookOptions, DualAxisOptions } from './types.js';
import { useStartMoveEnd } from './useStartMoveEnd.js';

export interface UseAxisZoomOptions
  extends ControllerHookOptions,
    DualAxisOptions {
  /**
   * The zoom direction to use on wheel events.
   * @defaultValue 'vertical'
   * */
  direction?: 'horizontal' | 'vertical';

  /**
   * Zoom rectangle stroke color.
   * @defaultValue "red"
   * */
  color?: CSSProperties['stroke'];
  /**
   * Additional zoom rectangle style.
   * */
  rectangleStyle?: CSSProperties;
  /**
   * Zoom limit lines style.
   * */
  lineStyle?: CSSProperties;
}

export function useAxisZoom(options: UseAxisZoomOptions = {}) {
  const {
    controllerId,
    disabled,
    direction = 'horizontal',
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'red',
    rectangleStyle,
    lineStyle,
  } = options;
  const axisId = direction === 'horizontal' ? horizontalAxisId : verticalAxisId;
  const plotControls = usePlotControls(options);

  const startMoveEnd = useStartMoveEnd({
    controllerId,
    disabled,
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
        <Line
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1={start}
          x2={start}
          y1="0"
          y2="100%"
          {...lineProps}
        />
        <Rectangle
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1={start}
          x2={end}
          y1="0"
          y2="100%"
          {...rectangleProps}
        />
        <Line
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1={end}
          x2={end}
          y1="0"
          y2="100%"
          {...lineProps}
        />
      </>
    );
  } else {
    annotations = (
      <>
        <Line
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1="0"
          x2="100%"
          y1={start}
          y2={start}
          {...lineProps}
        />
        <Rectangle
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1="0"
          x2="100%"
          y1={start}
          y2={end}
          {...rectangleProps}
        />
        <Line
          xAxis={horizontalAxisId}
          yAxis={verticalAxisId}
          x1="0"
          x2="100%"
          y1={end}
          y2={end}
          {...lineProps}
        />
      </>
    );
  }

  return { annotations };
}
