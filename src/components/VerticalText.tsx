import { ReactNode, SVGProps } from 'react';

export interface VerticalTextProps extends SVGProps<SVGTextElement> {
  label: ReactNode;
}

export default function VerticalText(props: VerticalTextProps) {
  const { transform = '', style, label, ...otherProps } = props;

  return (
    <text
      {...otherProps}
      transform={`${transform}rotate(-90)`}
      textAnchor="middle"
      style={{
        ...style,
        cursor: 'vertical-text',
      }}
    >
      {label}
    </text>
  );
}
