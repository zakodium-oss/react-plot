import { CSSProperties, useState } from 'react';

import { AnnotationLineProps, Line } from '../components/Annotations/Line';
import { AnnotationTextProps, Text } from '../components/Annotations/Text';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions, DualAxisOptions } from './types';

export interface UseCrossHairOptions
  extends ControllerHookOptions,
    DualAxisOptions {
  color?: CSSProperties['stroke'];
  textStyle?: CSSProperties;
  textTransform?: string;
  lineStyle?: CSSProperties;
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
      onMouseMove({ coordinates }) {
        setHover(coordinates);
      },
      onMouseLeave() {
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
        x1="0%"
        x2="100%"
        y1={hover[verticalAxisId]}
        y2={hover[verticalAxisId]}
        {...lineProps}
      />
      <Line
        y1="0%"
        y2="100%"
        x1={hover[horizontalAxisId]}
        x2={hover[horizontalAxisId]}
        {...lineProps}
      />
      <Text
        text-anchor="end"
        alignment-baseline="after-edge"
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
