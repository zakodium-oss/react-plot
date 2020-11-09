export function getMax(actionMax: number, stateMax: number | null | undefined) {
  return stateMax === null || stateMax === undefined || stateMax <= actionMax
    ? actionMax
    : stateMax;
}

export function getMin(actionMin: number, stateMin: number | null | undefined) {
  return stateMin === null || stateMin === undefined || stateMin >= actionMin
    ? actionMin
    : stateMin;
}
