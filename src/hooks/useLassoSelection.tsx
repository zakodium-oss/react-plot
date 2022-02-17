import pointInPolygon from 'point-in-polygon';
import { useMemo } from 'react';

import { SeriesPoint, useDrawPath } from '..';
import { CSSFuncProps } from '../types';
import { functionalStyle } from '../utils';

import { ControllerHookOptions, DualAxisOptions, PathOptions } from './types';

export interface UseLassoSelectionOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    PathOptions {
  defaultStyle?: CSSFuncProps<SeriesPoint>;
  hoveredStyle?: CSSFuncProps<SeriesPoint>;
}
export function useLassoSelection(options: UseLassoSelectionOptions) {
  const {
    defaultStyle,
    hoveredStyle,
    style: pathStyle = {
      fillOpacity: '0.2',
      stroke: 'black',
      strokeWidth: '2px',
    },
    ...otherProps
  } = options;
  const { points, annotations } = useDrawPath({
    style: pathStyle,
    type: 'polygone',
    ...otherProps,
  });
  const polygonePoints = points.map(({ x, y }) => [x, y]);
  const style = useMemo(() => {
    const style = { ...defaultStyle };
    for (const key in hoveredStyle) {
      style[key] = (point: SeriesPoint) =>
        pointInPolygon([point.x, point.y], polygonePoints)
          ? functionalStyle({}, hoveredStyle, point)[key]
          : functionalStyle({}, defaultStyle, point)[key];
    }
    return style;
  }, [defaultStyle, hoveredStyle, polygonePoints]);

  return { annotations, style };
}
