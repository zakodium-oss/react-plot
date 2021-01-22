import React, { ReactNode } from 'react';

export interface VerticalTextProps extends React.SVGProps<SVGTextElement> {
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
