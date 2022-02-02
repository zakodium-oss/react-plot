import { useState } from 'react';

import { Rectangle } from '../components/Annotations/Rectangle';
import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

const initialZoomState = {
  isZooming: false,
  start: 0,
  end: 0,
};

export function useHorizontalZoom(options: { axisId?: string } = {}) {
  const { axisId = 'x' } = options;

  const plotControls = usePlotControls();
  const [zoomState, setZoomState] = useState(initialZoomState);
  usePlotEvents({
    onMouseDown({ event: { button }, coordinates: { [axisId]: axisValue } }) {
      if (button !== 0) return;
      setZoomState({
        isZooming: true,
        start: axisValue,
        end: axisValue,
      });
    },
    onMouseMove({ coordinates: { [axisId]: axisValue } }) {
      if (!zoomState.isZooming) return;
      setZoomState((state) => ({ ...state, end: axisValue }));
    },
    onMouseUp() {
      if (!zoomState.isZooming) return;
      if (zoomState.start !== zoomState.end) {
        plotControls.setAxis(axisId, {
          min: Math.min(zoomState.start, zoomState.end),
          max: Math.max(zoomState.start, zoomState.end),
        });
      }
      setZoomState(initialZoomState);
    },
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxis(axisId);
    },
  });

  return {
    annotations: zoomState.isZooming ? (
      <Rectangle
        color="red"
        style={{ fillOpacity: 0.2, stroke: 'red' }}
        x1={zoomState.start}
        y1="100%"
        x2={zoomState.end}
        y2="0"
      />
    ) : null,
  };
}
