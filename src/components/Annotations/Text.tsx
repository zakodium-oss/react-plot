import { ReactNode, SVGProps } from 'react';

interface TextProps extends SVGProps<SVGTextElement> {
  children: ReactNode;
}

export default function Text(props: TextProps) {
  const { children, ...otherProps } = props;
  return <text {...otherProps}>{children}</text>;
}
