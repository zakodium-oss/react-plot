import { createContext, ReactNode, useContext, useMemo } from 'react';

export function createNestableContext<T>(defaultValue: T) {
  const context = createContext<Map<string | undefined, T>>(new Map());

  function useNestedContext(id?: string): T {
    const values = useContext(context);
    if (values.has(id)) {
      return values.get(id) as T;
    }
    return defaultValue;
  }

  function NestedContextProvider(props: {
    id?: string;
    value: T;
    children: ReactNode;
  }) {
    const { id, value, children } = props;
    const parentValues = useContext(context);
    const mergedValues = useMemo(() => {
      const merged = new Map(parentValues);
      merged.set(id, value);
      return merged;
    }, [parentValues, id, value]);
    return <context.Provider value={mergedValues}>{children}</context.Provider>;
  }

  return {
    useNestedContext,
    NestedContextProvider,
  };
}
