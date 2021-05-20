import { createContext, useContext, useState } from 'react';

export const sizeContext = createContext<(newSize: number) => void>(() => {
  // No-op
});

export function useSize() {
  return useState(0);
}

export function useSizeContext() {
  return useContext(sizeContext);
}
