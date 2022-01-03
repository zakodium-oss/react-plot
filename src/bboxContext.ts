import { createContext, Ref } from 'react';

export const bboxContext = createContext<Ref<SVGGElement>>(null);
