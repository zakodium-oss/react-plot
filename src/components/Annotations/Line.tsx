import { SVGProps } from 'react';

import { usePosition } from '../../hooks';

export type LineProps = SVGProps<SVGLineElement>;

export default function Line(props: LineProps) {
  const { x1: oldX1, x2: oldX2, y1: oldY1, y2: oldY2, ...lineProps } = props;
  const { x: x1, y: y1 } = usePosition({ x: oldX1, y: oldY1 });
  const { x: x2, y: y2 } = usePosition({ x: oldX2, y: oldY2 });
  return <line {...lineProps} x1={x1} x2={x2} y1={y1} y2={y2} />;
}
