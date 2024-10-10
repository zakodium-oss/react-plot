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

import { markersMap } from './Markers.map';

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
      const y = -(legendOffsets.bottom || 0) - legendOffset;
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
      const x = -(legendOffsets.right || 0) - legendOffset;
      return { x, y, horizontalAlign: 'end', verticalAlign: 'middle' };
    }
    default: {
      throw new Error(`Position ${JSON.stringify(position)} unknown`);
    }
  }
}

export type LegendPosition = Position | 'embedded';

export type LegendProps = {
  position?: LegendPosition;
  margin?: number;
  onClick?: (args: {
    event: React.MouseEvent<SVGGElement>;
    id: string;
  }) => void;
  labelStyle?: CSSFuncProps<{ id: string }>;
  lineStyle?: CSSFuncProps<{ id: string }>;
  showHide?: boolean;
} & { [K in Position]?: number };

export function Legend(options: LegendProps) {
  const {
    position = 'embedded',
    margin = 10,
    onClick,
    lineStyle: funcLineStyle = {},
    showHide = false,
    labelStyle: funcLabelStyle = {},
    ...legendOffsets
  } = options;
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

  function onClickLegendItem(event: React.MouseEvent<SVGGElement>, id: string) {
    onClick?.({ event, id });
    if (showHide) {
      legendDispatch({
        type: 'TOGGLE_VISIBILITY',
        payload: { id },
      });
    }
  }

  return (
    <AlignGroup {...alignGroupProps}>
      {state.labels.map((value, index) => {
        const labelStyle = functionalStyle(
          { fontSize: '16px' },
          funcLabelStyle,
          { id: value.id },
        );
        const lineStyle = functionalStyle({}, funcLineStyle, { id: value.id });
        // TODO: fix this as it's not guaranteed that `fontSize` can be parsed as a string.
        const height = Number.parseInt(String(labelStyle.fontSize), 10);
        const xPos = 10;
        const yPos = index * height + height / 2 + 3;
        if (value.range) {
          return (
            <g
              onClick={(event) => onClickLegendItem(event, value.id)}
              key={index}
              transform={`translate(${xPos}, 0)`}
              style={{ opacity: value.isVisible ? '1' : '0.6' }}
            >
              {getRangeShape({
                index,
                rangeColor: value.range.rangeColor,
                lineColor: value.colorLine,
                style: lineStyle,
                height,
              })}

              <text style={labelStyle} x={30} y={`${(index + 1) * height}`}>
                {value.label}
              </text>
            </g>
          );
        }

        let Marker;
        if (value.shape) {
          Marker = markersMap[value.shape.figure];
        }
        return (
          <g
            onClick={(event) => onClickLegendItem(event, value.id)}
            key={index}
            transform={`translate(${xPos}, 0)`}
            style={{ opacity: value.isVisible ? '1' : '0.6' }}
          >
            {getLineShape({
              index,
              color: value.colorLine,
              style: lineStyle,
              height,
            })}
            <g transform={`translate(${xPos - 1}, ${yPos})`}>
              {value.shape && Marker && !value.shape.hidden && (
                <Marker size={10} style={{ fill: value.shape.color }} />
              )}
            </g>

            <text style={labelStyle} x={30} y={`${(index + 1) * height}`}>
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
  color?: string;
  style?: CSSProperties;
  height?: number;
  width?: number;
}) {
  const { index, color, style = {}, height = 16 } = config;
  const x = 0;
  const { strokeWidth = '2px' } = style;
  const y = index * height + height / 2 + 3;

  return (
    <line
      x1={x}
      x2={x + 20}
      y1={y}
      y2={y}
      stroke={color}
      style={{ ...style, strokeWidth }}
    />
  );
}

function getRangeShape(config: {
  index: number;
  rangeColor?: string;
  lineColor?: string;
  style?: CSSProperties;
  height?: number;
}) {
  const { index, rangeColor, lineColor, style = {}, height = 16 } = config;
  const { strokeWidth = '15px' } = style;
  const lineHeight = Number.parseInt(strokeWidth?.toString(), 10) / 5;
  const x = 0;
  const y = index * height + height / 2 - lineHeight;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="20" height={lineHeight * 3} fill={rangeColor} />
      <line
        style={style}
        x1={0}
        y={0}
        x2={20}
        y2={0}
        stroke={lineColor}
        strokeWidth={lineHeight}
      />

      <line
        style={style}
        x1={0}
        y1={lineHeight * 3}
        x2={20}
        y2={lineHeight * 3}
        stroke={lineColor}
        strokeWidth={lineHeight}
      />
    </g>
  );
}
