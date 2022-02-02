import { useState } from 'react';

import { Rectangle } from '../components/Annotations/Rectangle';
import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

const initialZoomState = {
  isZooming: false,
  startX: 0,
  endX: 0,
  startY: 0,
  endY: 0,
};

export function useRectangularZoom(
  options: { horizontalAxisId?: string; verticalAxisId?: string } = {},
) {
  const { horizontalAxisId = 'x', verticalAxisId = 'y' } = options;

  const plotControls = usePlotControls();
  const [zoomState, setZoomState] = useState(initialZoomState);
  usePlotEvents({
    onMouseDown({
      event: { button },
      coordinates: {
        [horizontalAxisId]: horizontalAxisValue,
        [verticalAxisId]: verticalAxisValue,
      },
    }) {
      if (button !== 0) return;
      setZoomState({
        isZooming: true,
        startX: horizontalAxisValue,
        endX: horizontalAxisValue,
        startY: verticalAxisValue,
        endY: verticalAxisValue,
      });
    },
    onMouseMove({
      coordinates: {
        [horizontalAxisId]: horizontalAxisValue,
        [verticalAxisId]: verticalAxisValue,
      },
    }) {
      if (!zoomState.isZooming) return;
      setZoomState((state) => ({
        ...state,
        endX: horizontalAxisValue,
        endY: verticalAxisValue,
      }));
    },
    onMouseUp() {
      if (!zoomState.isZooming) return;
      if (
        zoomState.startX !== zoomState.endX &&
        zoomState.startY !== zoomState.endY
      ) {
        plotControls.setAxes({
          [horizontalAxisId]: {
            min: Math.min(zoomState.startX, zoomState.endX),
            max: Math.max(zoomState.startX, zoomState.endX),
          },
          [verticalAxisId]: {
            min: Math.min(zoomState.startY, zoomState.endY),
            max: Math.max(zoomState.startY, zoomState.endY),
          },
        });
      }
      setZoomState(initialZoomState);
    },
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxes([horizontalAxisId, verticalAxisId]);
    },
  });

  return {
    annotations: zoomState.isZooming ? (
      <Rectangle
        color="red"
        style={{ fillOpacity: 0.2, stroke: 'red' }}
        x1={zoomState.startX}
        x2={zoomState.endX}
        y1={zoomState.startY}
        y2={zoomState.endY}
      />
    ) : null,
  };
}
