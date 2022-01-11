import { SVGProps } from 'react';

import { Circle } from './Circle';
import { Line } from './Line';

export interface AnnotationPolylineProps
  extends Omit<SVGProps<SVGLineElement>, 'points'> {
  points: { x: number | string; y: number | string }[];
  displayPoints?: boolean;
}

export function Polyline(props: AnnotationPolylineProps) {
  const { points, displayPoints = false, ...polylineProps } = props;
  return (
    <>
      {points.map((point, i) => {
        if (i === points.length - 1) {
          return displayPoints ? (
            <Circle cx={point.x} cy={point.y} r={15} />
          ) : null;
        }
        return (
          <>
            <Line
              key={`${point.x}-${point.y}`}
              x1={point.x}
              y1={point.y}
              x2={points[i + 1].x}
              y2={points[i + 1].y}
              {...polylineProps}
            />
            {displayPoints ? <Circle cx={point.x} cy={point.y} r={15} /> : null}
          </>
        );
      })}
    </>
  );
}
