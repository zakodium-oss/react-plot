import { SVGProps } from 'react';

export type LineProps = SVGProps<SVGLineElement>;

export default function Line(props: LineProps) {
  return <line {...props} />;
}
