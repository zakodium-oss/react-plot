/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { AlignGroup, AlignGroupProps } from 'react-d3-utils';

import { usePlotContext } from '../hooks';
import type { Horizontal, LegendProps, Vertical } from '../types';

import { markersComps } from './Markers';
import { useLegend } from './legendsContext';


type Positions = { [K in Vertical | Horizontal]?: number };
interface ValidatedPosition {
  key?: Vertical | Horizontal;
  value?: number;
}
export function exclusiveProps(
  margins: Positions,
  a: keyof Positions,
  b: keyof Positions,
  position: string,
): ValidatedPosition {
  if (margins[a] !== undefined) {
    if (margins[b] !== undefined) {
      throw new Error(
        `${a} and ${b} should't be both defined for the position ${position}`,
      );
    }
    return { key: a, value: margins[a] };
  }
  return margins[b] !== undefined ? { key: b, value: margins[b] } : {};
}

function translation(
  position: Horizontal | Vertical | 'embedded',
  legendMargins: Positions,
  plotMargins: Required<Positions>,
  width: number,
  height: number,
): Omit<AlignGroupProps, 'children'> {
  const plotHeight = height - plotMargins.top - plotMargins.bottom;
  const plotWidth = width - plotMargins.left - plotMargins.right;
  switch (position) {
    case 'embedded': {
      const { key: verticalKey = 'top', value: verticalValue = 10 } =
        exclusiveProps(legendMargins, 'top', 'bottom', position);
      const { key: horizontalKey = 'left', value: horizontalValue = 10 } =
        exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right - horizontalValue
          : plotMargins.left + horizontalValue;
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      return {
        x,
        y,
        horizontalAlign: horizontalKey === 'left' ? 'start' : 'end',
        verticalAlign: verticalKey === 'top' ? 'start' : 'end',
      };
    }
    case 'top': {
      const {
        key: horizontalKey = 'left',
        value: horizontalValue = plotWidth / 2,
      } = exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right + horizontalValue
          : plotMargins.left + horizontalValue;
      const y = plotMargins.top - (legendMargins.bottom || 50);
      return { x, y };
    }
    case 'bottom': {
      const {
        key: horizontalKey = 'left',
        value: horizontalValue = plotWidth / 2,
      } = exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? width - plotMargins.right + horizontalValue
          : plotMargins.left + horizontalValue;
      const y = height - plotMargins.bottom + (legendMargins.top || 25);
      return { x, y };
    }
    case 'left': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      const x = plotMargins.left - (legendMargins.right || 100);
      return { x, y };
    }
    case 'right': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y =
        verticalKey === 'bottom'
          ? height - plotMargins.bottom - verticalValue
          : plotMargins.top + verticalValue;
      const x = width - plotMargins.right + (legendMargins.left || 40);
      return { x, y };
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export default function Legend({ position, ...legendMargins }: LegendProps) {
  const { right, left, top, bottom, height, width } = usePlotContext();
  const [state] = useLegend();

  const alignGroupProps = useMemo(() => {
    const plotMargins = { right, left, top, bottom };
    return translation(position, legendMargins, plotMargins, width, height);
  }, [position, legendMargins, right, left, top, bottom, width, height]);

  return (
    <AlignGroup {...alignGroupProps}>
      {state.labels.map((value, index) => {
        const xPos = 10;
        const yPos = (index + 1) * 16 - xPos + 5;

        if (value.range) {
          return (
            <g
              key={`${value.colorLine}/${value.range.rangeColor}-${value.label}`}
              transform={`translate(${xPos}, ${0})`}
            >
              {getRangeShape({
                index,
                rangeColor: value.range.rangeColor,
                lineColor: value.colorLine,
              })}

              <text
                key={`text-${value.label}-${index}`}
                x={30}
                y={`${index + 1}em`}
              >
                {value.label}
              </text>
            </g>
          );
        }

        const Marker = markersComps[value.shape.figure];
        return (
          <g
            key={`${value.colorLine}/${value.shape.color}-${value.label}`}
            transform={`translate(${xPos}, ${0})`}
          >
            {getLineShape({ index, color: value.colorLine })}
            <g transform={`translate(${xPos - 1}, ${yPos})`}>
              {!value.shape.hidden && (
                <Marker size={10} style={{ fill: value.shape.color }} />
              )}
            </g>

            <text
              key={`text-${value.label}-${index}`}
              x={30}
              y={`${index + 1}em`}
            >
              {value.label}
            </text>
          </g>
        );
      })}
    </AlignGroup>
  );
}

function getLineShape(config: { index: number; color: string }) {
  const x = 0;
  const y = (config.index + 1) * 16 - x - 7;

  return <rect x={x} y={y} width="20" height="3" fill={config.color} />;
}

function getRangeShape(config: {
  index: number;
  rangeColor: string;
  lineColor: string;
}) {
  const x = 0;
  const y = (config.index + 1) * 16 - x - 12;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="20" height="10" fill={config.rangeColor} />
      <line
        x1={0}
        y={0}
        x2={20}
        y2={0}
        stroke={config.lineColor}
        strokeWidth={3}
      />

      <line
        x1={0}
        y1={10}
        x2={20}
        y2={10}
        stroke={config.lineColor}
        strokeWidth={3}
      />
    </g>
  );
}
