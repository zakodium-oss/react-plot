import { ReactNode } from 'react';

export interface SeriesProps {
  children: ReactNode;
}

export function Series(props: SeriesProps): JSX.Element {
  return <>{props.children}</>;
}
