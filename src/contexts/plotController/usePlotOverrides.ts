import { useMemo, useState } from 'react';

interface PlotAxisOverrides {
  min: number | null;
  max: number | null;
}

export type PlotAxesOverrides = Record<string, PlotAxisOverrides>;

export interface PlotOverridesState {
  axes: PlotAxesOverrides;
}

export interface PlotControls {
  /**
   * Override the min/max of an axis.
   * @param axisId Id of the axis to override.
   * @param override Value to override.
   */
  setAxis: (axisId: string, overrides: PlotAxisOverrides) => void;
  /**
   * Reset multiple overridden axes.
   * @param axisIds Ids of the axes to reset.
   */
  resetAxes: (axisIds: string[]) => void;
}

export const initialPlotOverridesState: PlotOverridesState = {
  axes: {},
};

export function usePlotOverridesState() {
  const [overrides, setOverrides] = useState<PlotOverridesState>(
    initialPlotOverridesState,
  );

  const controls = useMemo<PlotControls>(() => {
    return {
      setAxis(axisId: string, override: PlotAxisOverrides) {
        setOverrides((state) => ({
          ...state,
          axes: { ...state.axes, [axisId]: override },
        }));
      },
      resetAxes(axisIds: string[]) {
        setOverrides((state) => ({
          ...state,
          axes: Object.fromEntries(
            Object.entries(state.axes).filter(
              ([axisId]) => !axisIds.includes(axisId),
            ),
          ),
        }));
      },
    };
  }, []);

  return {
    overrides,
    controls,
  };
}
