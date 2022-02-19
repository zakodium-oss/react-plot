import { useRef, useEffect, useState } from 'react';

import { usePlotEvents, UseStartMoveEndOptions } from '..';

export function usePathData(options: UseStartMoveEndOptions) {
  const ref = useRef(options);
  useEffect(() => {
    ref.current = options;
  }, [options]);
  const [data, setData] = useState<Record<string, number>[]>(null);
  usePlotEvents({
    onPointerDown(result) {
      if (result.event.button !== 0) return;
      const { clampedCoordinates } = result;
      setData([clampedCoordinates]);
      ref.current?.onStart?.(result);
    },
    onPointerMove(result) {
      // TODO: boolean that says if pointer is currently down?
      if (!data) return;
      const { clampedCoordinates } = result;
      let isDuplicated = true;
      for (const key in clampedCoordinates) {
        if (data[data.length - 1][key] !== clampedCoordinates[key]) {
          isDuplicated = false;
          break;
        }
      }
      if (isDuplicated) return;
      setData((data) => data.concat(clampedCoordinates));
      ref.current?.onMove?.(result);
    },
    onPointerUp(result) {
      if (result.event.button !== 0 || !data) return;
      setData(null);
      ref.current?.onEnd?.(result);
    },
  });

  return data;
}
