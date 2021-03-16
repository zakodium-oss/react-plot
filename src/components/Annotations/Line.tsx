import { SVGProps } from 'react';

type LineProps = SVGProps<SVGLineElement>;

export default function Line(props: LineProps) {
  return <line {...props} />;
}
