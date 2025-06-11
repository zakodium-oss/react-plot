import type { CSSProperties } from 'react';
import { useState } from 'react';

import type { AnnotationLineProps } from '../components/Annotations/Line.js';
import { Line } from '../components/Annotations/Line.js';
import type { AnnotationTextProps } from '../components/Annotations/Text.js';
import { Text } from '../components/Annotations/Text.js';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext.js';

import type { ControllerHookOptions, DualAxisOptions } from './types.js';

export interface UseCrossHairOptions
  extends ControllerHookOptions,
    DualAxisOptions {
  /**
   * Cross hair line color.
   * @defaultValue "black"
   * */
  color?: CSSProperties['stroke'];
  /**
   * Additional style to apply to the crosshair's lines.
   * */
  lineStyle?: CSSProperties;
  /**
   * Cross hair text annotation style.
   * */
  textStyle?: CSSProperties;
  /**
   * Transformation to apply to the crosshair's text.
   *
   * */
  textTransform?: string;
}

type Positions = Record<string, number>;
export function useCrossHair(options: UseCrossHairOptions = {}) {
  const [hover, setHover] = useState<Positions | null>(null);
  const {
    color = 'black',
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    lineStyle,
    textStyle,
    textTransform = '',
  } = options;
  usePlotEvents(
    {
      onPointerMove({ coordinates }) {
        setHover(coordinates);
      },
      onPointerLeave() {
        setHover(null);
      },
    },
    options,
  );

  const lineProps: Partial<AnnotationLineProps> = {
    color,
    strokeWidth: '2',
    style: lineStyle,
  };
  const textProps: Partial<AnnotationTextProps> = {
    transform: `translate(-3 -2) ${textTransform}`,
    style: textStyle,
  };

  if (!hover) return { annotations: null };

  const annotations = (
    <>
      <Line
        xAxis={horizontalAxisId}
        yAxis={verticalAxisId}
        x1="0%"
        x2="100%"
        y1={hover[verticalAxisId]}
        y2={hover[verticalAxisId]}
        {...lineProps}
      />
      <Line
        xAxis={horizontalAxisId}
        yAxis={verticalAxisId}
        y1="0%"
        y2="100%"
        x1={hover[horizontalAxisId]}
        x2={hover[horizontalAxisId]}
        {...lineProps}
      />
      <Text
        xAxis={horizontalAxisId}
        yAxis={verticalAxisId}
        textAnchor="end"
        alignmentBaseline="after-edge"
        x={hover[horizontalAxisId]}
        y={hover[verticalAxisId]}
        {...textProps}
      >
        {hover[horizontalAxisId]?.toFixed(2)} ,
        {hover[verticalAxisId]?.toFixed(2)}
      </Text>
    </>
  );

  return { annotations };
}
