import { ReactNode, SVGProps } from 'react';

export interface AnnotationTextProps extends SVGProps<SVGTextElement> {
  children: ReactNode;
}

export function Text(props: AnnotationTextProps) {
  const { children, ...otherProps } = props;
  return <text {...otherProps}>{children}</text>;
}
