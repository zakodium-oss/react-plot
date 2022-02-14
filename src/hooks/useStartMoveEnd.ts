import { useEffect, useRef, useState } from 'react';

import { TrackingResult } from '../components/Tracking';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export type UseStartMoveEndCallback = (data: TrackingResult) => void;

export interface UseStartMoveEndOptions extends ControllerHookOptions {
  onStart?: UseStartMoveEndCallback;
  onMove?: UseStartMoveEndCallback;
  onEnd?: UseStartMoveEndCallback;
}

export interface UseStartMoveEndState {
  start: {
    coordinates: Record<string, number>;
    clampedCoordinates: Record<string, number>;
  };
  end?: {
    coordinates: Record<string, number>;
    clampedCoordinates: Record<string, number>;
  };
}

export function useStartMoveEnd(options: UseStartMoveEndOptions) {
  const ref = useRef(options);
  useEffect(() => {
    ref.current = options;
  }, [options]);
  const [data, setData] = useState<UseStartMoveEndState | null>(null);
  usePlotEvents(
    {
      onMouseDown(result) {
        if (result.event.button !== 0) return;
        const { coordinates, clampedCoordinates } = result;
        setData({ start: { coordinates, clampedCoordinates } });
        ref.current?.onStart?.(result);
      },
      onMouseMove(result) {
        // TODO: boolean that says if mouse is currently down?
        if (!data) return;
        const { coordinates, clampedCoordinates } = result;
        setData((data) => ({
          ...data,
          end: { coordinates, clampedCoordinates },
        }));
        ref.current?.onMove?.(result);
      },
      onMouseUp(result) {
        if (result.event.button !== 0 || !data) return;
        setData(null);
        ref.current?.onEnd?.(result);
      },
    },
    options,
  );

  return data;
}
