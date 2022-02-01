/* eslint-disable react/no-array-index-key */
import { CSSProperties, useContext, useEffect, useMemo } from 'react';
import { AlignGroup, AlignGroupProps } from 'react-d3-utils';

import { useLegend } from '../contexts/legendContext';
import { legendOffsetContext } from '../contexts/legendOffsetContext';
import {
  usePlotContext,
  usePlotDispatchContext,
} from '../contexts/plotContext';
import type { CSSFuncProps, Position } from '../types';
import { functionalStyle } from '../utils';

import { markersComps } from './Markers';

type Positions = { [K in Position]?: number };

interface ValidatedPosition {
  key?: Position;
  value?: number;
}

function exclusiveProps(
  offsets: Positions,
  a: keyof Positions,
  b: keyof Positions,
  position: string,
): ValidatedPosition {
  if (offsets[a] !== undefined) {
    if (offsets[b] !== undefined) {
      throw new Error(
        `${a} and ${b} should't be both defined for the position ${position}`,
      );
    }
    return { key: a, value: offsets[a] };
  }
  return offsets[b] !== undefined ? { key: b, value: offsets[b] } : {};
}

function translation(
  position: LegendPosition,
  legendOffsets: Positions,
  plotWidth: number,
  plotHeight: number,
  legendOffset: number,
): Omit<AlignGroupProps, 'children'> {
  switch (position) {
    case 'embedded': {
      const { key: verticalKey = 'top', value: verticalValue = 10 } =
        exclusiveProps(legendOffsets, 'top', 'bottom', position);
      const { key: horizontalKey = 'left', value: horizontalValue = 10 } =
        exclusiveProps(legendOffsets, 'left', 'right', position);
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
        legendOffsets,
        'left',
        'right',
        position,
      );
      const x = horizontalValue;
      const y = (-legendOffsets.bottom || 0) - legendOffset;
      return { x, y, horizontalAlign: 'middle', verticalAlign: 'end' };
    }
    case 'right': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendOffsets, 'top', 'bottom', position);
      const y = verticalKey === 'bottom' ? -verticalValue : verticalValue;
      const x = plotWidth + (legendOffsets.left || 0) + legendOffset;
      return { x, y, horizontalAlign: 'start', verticalAlign: 'middle' };
    }
    case 'bottom': {
      const { value: horizontalValue = plotWidth / 2 } = exclusiveProps(
        legendOffsets,
        'left',
        'right',
        position,
      );
      const x = horizontalValue;
      const y = plotHeight + (legendOffsets.top || 0) + legendOffset;
      return { x, y, horizontalAlign: 'middle', verticalAlign: 'start' };
    }
    case 'left': {
      const {
        key: verticalKey = 'top',
        value: verticalValue = plotHeight / 2,
      } = exclusiveProps(legendOffsets, 'top', 'bottom', position);
      const y = verticalKey === 'bottom' ? -verticalValue : verticalValue;
      const x = (-legendOffsets.right || 0) - legendOffset;
      return { x, y, horizontalAlign: 'end', verticalAlign: 'middle' };
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export type LegendPosition = Position | 'embedded';

export type LegendProps = {
  position: LegendPosition;
  margin?: number;
  onClick?: (args: {
    event?: React.MouseEvent<SVGGElement, MouseEvent>;
    id?: string;
  }) => void;
  labelStyle?: CSSFuncProps<{ id: string }>;
  lineStyle?: CSSFuncProps<{ id: string }>;
  showHide?: boolean;
} & { [K in Position]?: number };

export function Legend({
  position,
  margin = 10,
  onClick,
  labelStyle: oldLabelStyle,
  lineStyle,
  showHide = false,
  ...legendOffsets
}: LegendProps) {
  const { plotWidth, plotHeight } = usePlotContext();
  const plotDispatch = usePlotDispatchContext();
  const [state, legendDispatch] = useLegend();
  const legendOffset = useContext(legendOffsetContext);

  const alignGroupProps = useMemo(() => {
    return translation(
      position,
      legendOffsets,
      plotWidth,
      plotHeight,
      legendOffset,
    );
  }, [position, legendOffsets, plotWidth, plotHeight, legendOffset]);

  useEffect(() => {
    plotDispatch({ type: 'addLegend', payload: { position, margin } });
    return () => plotDispatch({ type: 'removeLegend' });
  }, [plotDispatch, position, margin]);

  return (
    <AlignGroup {...alignGroupProps}>
      {state.labels.map((value, index) => {
        const xPos = 10;
        const yPos = (index + 1) * 16 - xPos + 5;
        const labelStyle = functionalStyle({}, oldLabelStyle, { id: value.id });
        const style = functionalStyle({}, lineStyle, { id: value.id });
        if (value.range) {
          return (
            <g
              onClick={(event) => {
                onClick?.({ event, id: value.id });
                if (showHide) {
                  legendDispatch({
                    type: 'ADD_LEGEND_LABEL',
                    payload: {
                      ...value,
                      visibility: !value.visibility,
                    },
                  });
                }
              }}
              key={`${value.colorLine}/${value.range.rangeColor}-${value.label}`}
              transform={`translate(${xPos}, ${0})`}
            >
              {getRangeShape({
                index,
                rangeColor: value.range.rangeColor,
                lineColor: value.colorLine,
                style,
              })}

              <text
                style={labelStyle}
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
            onClick={(event) => {
              onClick?.({ event, id: value.id });
              if (showHide) {
                legendDispatch({
                  type: 'ADD_LEGEND_LABEL',
                  payload: {
                    ...value,
                    visibility: !value.visibility,
                  },
                });
              }
            }}
            key={`${value.colorLine}/${value.shape.color}-${value.label}`}
            transform={`translate(${xPos}, ${0})`}
          >
            {getLineShape({ index, color: value.colorLine, style })}
            <g transform={`translate(${xPos - 1}, ${yPos})`}>
              {!value.shape.hidden && (
                <Marker size={10} style={{ fill: value.shape.color }} />
              )}
            </g>

            <text
              style={labelStyle}
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

function getLineShape(config: {
  index: number;
  color: string;
  style?: CSSProperties;
}) {
  const x = 0;
  // TODO: do not hardcode values
  const y = (config.index + 1) * 16 - x - 5;

  return (
    <line
      x1={x}
      x2={x + 20}
      y1={y}
      y2={y}
      stroke={config.color}
      style={config.style}
    />
  );
}

function getRangeShape(config: {
  index: number;
  rangeColor: string;
  lineColor: string;
  style?: CSSProperties;
}) {
  const { index, rangeColor, lineColor, style = {} } = config;
  const x = 0;
  const y = (index + 1) * 16 - x - 12;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="20" height="10" fill={rangeColor} />
      <line
        style={style}
        x1={0}
        y={0}
        x2={20}
        y2={0}
        stroke={lineColor}
        strokeWidth={3}
      />

      <line
        style={style}
        x1={0}
        y1={10}
        x2={20}
        y2={10}
        stroke={lineColor}
        strokeWidth={3}
      />
    </g>
  );
}
