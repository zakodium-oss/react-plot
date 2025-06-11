import type { ReactElement, ReactNode } from 'react';

export interface AnnotationsProps {
  children: ReactNode;
}

export function Annotations(props: AnnotationsProps): ReactElement {
  return <>{props.children}</>;
}
