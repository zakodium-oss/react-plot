import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { PlotObject, PlotObjectProps } from './components/PlotObject';
export function createSVG(param: PlotObjectProps) {
  const plot = createElement(PlotObject, param);
  return renderToString(plot);
}
