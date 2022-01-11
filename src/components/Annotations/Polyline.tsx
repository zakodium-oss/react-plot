import { SVGProps } from 'react';

import { Line } from './Line';

export interface AnnotationPolylineProps
  extends Omit<SVGProps<SVGLineElement>, 'points'> {
  points: { x: number | string; y: number | string }[];
}

export function Polyline(props: AnnotationPolylineProps) {
  const { points, ...polylineProps } = props;
  return (
    <>
      {points.map((point, i) => {
        if (i === points.length - 1) {
          return null;
        }
        return (
          <Line
            key={`${point.x}-${point.y}`}
            x1={point.x}
            y1={point.y}
            x2={points[i + 1].x}
            y2={points[i + 1].y}
            {...polylineProps}
          />
        );
      })}
    </>
  );
}
