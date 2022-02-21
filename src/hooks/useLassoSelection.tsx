import pointInPolygon from 'point-in-polygon';
import { useState } from 'react';

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
  const [style, setStyle] = useState<CSSFuncProps<SeriesPoint>>({
    ...defaultStyle,
  });
  const { annotations } = useDrawPath({
    style: pathStyle,
    close: true,
    onDrawing(points) {
      const polygonePoints = points.map(({ x, y }) => [x, y]);
      const newStyle = style;
      for (const key in hoveredStyle) {
        newStyle[key] = (point: SeriesPoint) =>
          pointInPolygon([point.x, point.y], polygonePoints)
            ? functionalStyle({}, hoveredStyle, point)[key]
            : functionalStyle({}, defaultStyle, point)[key];
      }
      setStyle(newStyle);
    },
    ...otherProps,
  });

  return { annotations, style };
}
