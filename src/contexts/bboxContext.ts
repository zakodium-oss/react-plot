import type { Ref } from 'react';
import { createContext } from 'react';

export const bboxContext = createContext<Ref<SVGGElement>>(null);
