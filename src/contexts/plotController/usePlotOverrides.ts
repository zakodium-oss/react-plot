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
  setAxis: (axisId: string, override: PlotAxisOverrides) => void;
  /**
   * Reset an overridden axis.
   * @param axisId Id of the axis to reset.
   */
  resetAxis: (axisId: string) => void;
  /**
   * Override the min/max of multiple axes.
   * @param axisId Id of the axis to override.
   * @param overrides Dictionary of axes to override.
   */
  setAxes: (overrides: Record<string, PlotAxisOverrides>) => void;
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
      resetAxis(axisId) {
        setOverrides((state) => ({
          ...state,
          axes: Object.fromEntries(
            Object.entries(state.axes).filter(
              ([existingAxisId]) => existingAxisId !== axisId,
            ),
          ),
        }));
      },
      setAxes(overrides: Record<string, PlotAxisOverrides>) {
        setOverrides((state) => {
          const newAxes = { ...state.axes };
          for (const [axisId, override] of Object.entries(overrides)) {
            newAxes[axisId] = override;
          }
          return {
            ...state,
            axes: newAxes,
          };
        });
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
