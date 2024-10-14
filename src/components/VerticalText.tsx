import type { ReactNode, SVGProps } from 'react';

export interface VerticalTextProps extends SVGProps<SVGTextElement> {
  label: ReactNode;
}

export default function VerticalText(props: VerticalTextProps) {
  const { transform = '', label, ...otherProps } = props;

  return (
    <text
      {...otherProps}
      transform={`${transform}rotate(-90)`}
      textAnchor="middle"
    >
      {label}
    </text>
  );
}
