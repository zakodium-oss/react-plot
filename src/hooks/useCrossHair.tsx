import { CSSProperties, useState } from 'react';

import { Group } from '../components/Annotations/Group';
import { AnnotationLineProps, Line } from '../components/Annotations/Line';
import { Text } from '../components/Annotations/Text';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

import { DualAxisOptions } from './types';

export interface UseCrossHairOptions extends DualAxisOptions {
  color?: CSSProperties['stroke'];
  textStyle?: CSSProperties;
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
  } = options;
  usePlotEvents({
    onMouseMove({ coordinates }) {
      setHover(coordinates);
    },
    onMouseLeave() {
      setHover(null);
    },
  });

  const lineProps: Partial<AnnotationLineProps> = {
    color,
    strokeWidth: '2',
    style: lineStyle,
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
      <Group
        x={hover[horizontalAxisId]}
        y={hover[verticalAxisId]}
        horizontalAlign="end"
        verticalAlign="end"
      >
        <Text
          text-anchor="end"
          alignment-baseline="baseline"
          x="0"
          y="0"
          style={textStyle}
        >
          {hover[horizontalAxisId].toFixed(2)} ,
          {hover[verticalAxisId].toFixed(2)}
        </Text>
      </Group>
    </>
  );

  return { annotations };
}
