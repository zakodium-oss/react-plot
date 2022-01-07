/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { AlignGroup, AlignGroupProps } from 'react-d3-utils';

import { useLegend } from '../legendContext';
import { usePlotContext } from '../plotContext';
import type { Position } from '../types';

import { markersComps } from './Markers';

type Positions = { [K in Position]?: number };

interface ValidatedPosition {
  key?: Position;
  value?: number;
}

function exclusiveProps(
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
  position: Position | 'embedded',
  legendMargins: Positions,
  plotWidth: number,
  plotHeight: number,
): Omit<AlignGroupProps, 'children'> {
  switch (position) {
    case 'embedded': {
      const { key: verticalKey = 'top', value: verticalValue = 10 } =
        exclusiveProps(legendMargins, 'top', 'bottom', position);
      const { key: horizontalKey = 'left', value: horizontalValue = 10 } =
        exclusiveProps(legendMargins, 'left', 'right', position);
      const x =
        horizontalKey === 'right'
          ? plotWidth - horizontalValue
          : horizontalValue;
      const y =
        verticalKey === 'bottom' ? plotHeight - verticalValue : verticalValue;
      return {
        x,
        y,
        horizontalAlign: horizontalKey === 'left' ? 'start' : 'end',
        verticalAlign: verticalKey === 'top' ? 'start' : 'end',
      };
    }
    case 'top': {
      const { value: horizontalValue = plotWidth / 2 } = exclusiveProps(
        legendMargins,
        'left',
        'right',
        position,
      );
      const x = horizontalValue;
      const y = -legendMargins.bottom || 0;
      return { x, y, horizontalAlign: 'middle', verticalAlign: 'end' };
    }
    case 'bottom': {
      const { value: horizontalValue = plotWidth / 2 } = exclusiveProps(
        legendMargins,
        'left',
        'right',
        position,
      );
      const x = horizontalValue;
      const y = plotHeight + (legendMargins.top || 0);
      return { x, y, horizontalAlign: 'middle', verticalAlign: 'start' };
    }
    case 'left': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y = verticalKey === 'bottom' ? -verticalValue : verticalValue;
      const x = -legendMargins.right || 0;
      return { x, y, horizontalAlign: 'end', verticalAlign: 'middle' };
    }
    case 'right': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendMargins, 'top', 'bottom', position);
      const y = verticalKey === 'bottom' ? -verticalValue : verticalValue;
      const x = plotWidth + (legendMargins.left || 0);
      return { x, y, horizontalAlign: 'start', verticalAlign: 'middle' };
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export type LegendProps = {
  position: Position | 'embedded';
} & { [K in Position]?: number };

export function Legend({ position, ...legendMargins }: LegendProps) {
  const { plotWidth, plotHeight } = usePlotContext();
  const [state] = useLegend();

  const alignGroupProps = useMemo(() => {
    return translation(position, legendMargins, plotWidth, plotHeight);
  }, [position, legendMargins, plotWidth, plotHeight]);

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
