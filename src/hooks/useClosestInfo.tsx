import { Annotation } from '..';
import { ClosestMethods } from '../components/Tracking';

import { useTrackClosestPoint } from './useTrackClosestPoint';

interface UseClosestInfoOptions {
  method: ClosestMethods;
}

export default function useClosestInfo(options: UseClosestInfoOptions) {
  const { method } = options;
  const trackedPoint = useTrackClosestPoint({ method });
  if (trackedPoint === null) {
    return {
      annotations: null,
      infoDiv: null,
    };
  }

  const { closest, event } = trackedPoint;

  const annotations = (
    <>
      {Object.entries(closest).map(([id, info]) => (
        <Annotation.Shape
          key={id}
          shape="circle"
          x={info.point.x}
          y={info.point.y}
          size={5}
        />
      ))}
    </>
  );

  const infoDiv = (
    <div
      style={{
        position: 'fixed',
        left: event.clientX + 5,
        top: event.clientY + 5,
        borderStyle: 'solid',
        padding: '5px',
        backgroundColor: 'white',
      }}
    >
      <b>Closest point</b>
      {Object.keys(closest).map((key) => (
        <p key={key}>
          <b>{closest[key].label}</b>
          <span>
            {' x: '}
            {Math.round((closest[key].point.x || 0) * 100) / 100}
          </span>
          <span>
            {' y: '}
            {Math.round((closest[key].point.y || 0) * 100) / 100}
          </span>
        </p>
      ))}
    </div>
  );
  return {
    infoDiv,
    annotations,
  };
}
