import { CSSProperties, useState } from 'react';

import { Group } from '../components/Annotations/Group';
import { AnnotationLineProps, Line } from '../components/Annotations/Line';
import { Text } from '../components/Annotations/Text';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

export interface UseCrossHairOptions {
  axisId?: { x: string; y: string };
  color?: CSSProperties['stroke'];
  textStyle?: CSSProperties;
  lineStyle?: CSSProperties;
}

type Positions = Record<string, number>;
export function useCrossHair(options: UseCrossHairOptions = {}) {
  const [hover, setHover] = useState<Positions | null>(null);
  const {
    color = 'black',
    axisId = { x: 'x', y: 'y' },
    lineStyle,
    textStyle,
  } = options;
  const { x, y } = axisId;
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
      <Line x1="0%" x2="100%" y1={hover[y]} y2={hover[y]} {...lineProps} />
      <Line y1="0%" y2="100%" x1={hover[x]} x2={hover[x]} {...lineProps} />
      <Group
        x={hover[x]}
        y={hover[y]}
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
          {hover[x].toFixed(2)} ,{hover[y].toFixed(2)}
        </Text>
      </Group>
    </>
  );

  return { annotations };
}
