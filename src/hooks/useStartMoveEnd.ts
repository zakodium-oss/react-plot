import { useEffect, useRef, useState } from 'react';

import { TrackingResult } from '../components/Tracking';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export type UseStartMoveEndCallback = (
  data: TrackingResult<PointerEvent>,
  start: UseStartMoveEndPosition,
  end: UseStartMoveEndPosition,
) => void;

export interface UseStartMoveEndOptions extends ControllerHookOptions {
  onStart?: UseStartMoveEndCallback;
  onMove?: UseStartMoveEndCallback;
  onEnd?: UseStartMoveEndCallback;
}

export interface UseStartMoveEndPosition {
  coordinates: Record<string, number>;
  clampedCoordinates: Record<string, number>;
}

export interface UseStartMoveEndState {
  start: UseStartMoveEndPosition;
  end?: UseStartMoveEndPosition;
}

export function useStartMoveEnd(options: UseStartMoveEndOptions) {
  const ref = useRef(options);
  useEffect(() => {
    ref.current = options;
  }, [options]);
  const [data, setData] = useState<UseStartMoveEndState | null>(null);
  usePlotEvents(
    {
      onPointerDown(result) {
        if (result.event.button !== 0 || result.event.altKey) return;
        const { coordinates, clampedCoordinates } = result;
        const position = { coordinates, clampedCoordinates };
        setData({ start: position });
        ref.current?.onStart?.(result, position, position);
      },
      onPointerMove(result) {
        // TODO: boolean that says if pointer is currently down?
        if (!data || result.event.altKey) return;
        const { coordinates, clampedCoordinates } = result;
        const position = { coordinates, clampedCoordinates };
        setData((data) => {
          if (!data) return null;
          return {
            ...data,
            end: position,
          };
        });
        ref.current?.onMove?.(result, data.start, position);
      },
      onPointerUp(result) {
        if (result.event.button !== 0 || !data || result.event.altKey) return;
        setData(null);
        if (data.end) {
          ref.current?.onEnd?.(result, data.start, data.end);
        }
      },
    },
    options,
  );

  return data;
}
