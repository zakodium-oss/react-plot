import type { CSSProperties, Ref } from 'react';

import { bboxContext } from '../../contexts/bboxContext.js';
import type { PlotChildren } from '../../utils/splitChildren.js';
import TransparentRect from '../TransparentRect.js';

interface MainLayerProps {
  width: number;
  height: number;
  svgStyle: CSSProperties;
  svgId?: string;
  svgClassName?: string;
  plotViewportStyle?: CSSProperties;
  seriesViewportStyle?: CSSProperties;
  topOffset: number;
  leftOffset: number;
  plotWidth: number;
  plotHeight: number;
  plotId: string;
  series: PlotChildren['series'];
  topAxisRef: Ref<SVGGraphicsElement>;
  topAxis: PlotChildren['topAxis'];
  rightAxisRef: Ref<SVGGraphicsElement>;
  rightAxis: PlotChildren['rightAxis'];
  bottomAxisRef: Ref<SVGGraphicsElement>;
  bottomAxis: PlotChildren['bottomAxis'];
  leftAxisRef: Ref<SVGGraphicsElement>;
  leftAxis: PlotChildren['leftAxis'];
  headingRef: Ref<SVGGraphicsElement>;
  heading: PlotChildren['heading'];
}

export default function MainLayer(props: MainLayerProps) {
  const {
    width,
    height,
    svgStyle,
    svgId,
    svgClassName,
    plotViewportStyle,
    seriesViewportStyle,
    topOffset,
    leftOffset,
    plotWidth,
    plotHeight,
    plotId,
    series,
    topAxisRef,
    topAxis,
    rightAxisRef,
    rightAxis,
    bottomAxisRef,
    bottomAxis,
    leftAxisRef,
    leftAxis,
    headingRef,
    heading,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={svgStyle}
      id={svgId}
      className={svgClassName}
    >
      {/* Plot viewport */}
      <TransparentRect
        width={width}
        height={height}
        style={plotViewportStyle}
      />

      {/* Series viewport */}
      <g transform={`translate(${leftOffset}, ${topOffset})`}>
        <TransparentRect
          width={plotWidth}
          height={plotHeight}
          style={seriesViewportStyle}
        />

        {/* Prevents the chart from being drawn outside of the viewport */}
        <clipPath id={`seriesViewportClip-${plotId}`}>
          <rect width={plotWidth} height={plotHeight} />
        </clipPath>

        <g style={{ clipPath: `url(#seriesViewportClip-${plotId})` }}>
          {series}
        </g>

        <bboxContext.Provider value={topAxisRef}>
          <g>{topAxis}</g>
        </bboxContext.Provider>

        <bboxContext.Provider value={rightAxisRef}>
          <g>{rightAxis}</g>
        </bboxContext.Provider>

        <bboxContext.Provider value={bottomAxisRef}>
          <g>{bottomAxis}</g>
        </bboxContext.Provider>

        <bboxContext.Provider value={leftAxisRef}>
          <g>{leftAxis}</g>
        </bboxContext.Provider>
      </g>

      <g ref={headingRef}>{heading}</g>
    </svg>
  );
}
