import { CSSProperties, ReactNode, Ref } from 'react';

import { legendOffsetContext } from '../../contexts/legendOffsetContext';
import { PlotChildren } from '../../utils/splitChildren';

interface AnnotationsTrackingLayerProps {
  width: number;
  height: number;
  svgStyle: CSSProperties;
  svgId?: string;
  svgClassName?: string;
  topOffset: number;
  leftOffset: number;
  legendOffset: number;
  legend: PlotChildren['legend'];
  legendRef: Ref<SVGGraphicsElement>;
  plotId: string;
  annotations: PlotChildren['annotations'];
  tracking: ReactNode | null;
}

export default function AnnotationsTrackingLayer(
  props: AnnotationsTrackingLayerProps,
) {
  const {
    width,
    height,
    svgStyle,
    svgId,
    svgClassName,
    topOffset,
    leftOffset,
    legendOffset,
    legend,
    legendRef,
    plotId,
    annotations,
    tracking,
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={svgStyle}
      id={svgId ? `${svgId}-annotations` : undefined}
      className={svgClassName}
    >
      <g transform={`translate(${leftOffset}, ${topOffset})`}>
        <g style={{ clipPath: `url(#seriesViewportClip-${plotId})` }}>
          {annotations}
        </g>
        {tracking}
      </g>

      {/* Series viewport */}
      <g transform={`translate(${leftOffset}, ${topOffset})`}>
        <legendOffsetContext.Provider value={legendOffset}>
          <g ref={legendRef}>{legend}</g>
        </legendOffsetContext.Provider>
      </g>
    </svg>
  );
}
