import { type ReactElement, ReactNode } from 'react';

export interface SeriesProps {
  children: ReactNode;
}

export function Series(props: SeriesProps): ReactElement {
  return <>{props.children}</>;
}
