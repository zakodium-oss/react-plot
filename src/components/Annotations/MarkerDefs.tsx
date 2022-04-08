export default function MarkerDefs({
  color,
  id,
  width = 6,
}: {
  color?: string;
  id: string;
  width?: number;
}) {
  return (
    <defs>
      <marker
        id={`marker-triangle-${id}`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth={width}
        markerHeight={width}
        orient="auto-start-reverse"
      >
        <path fill={color} d="M 0 0 L 10 5 L 0 10 z" />
      </marker>

      <marker
        id={`marker-circle-${id}`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth={width}
        markerHeight={width}
      >
        <circle cx="5" cy="5" r="5" fill={color} />
      </marker>

      <marker
        id={`marker-line-${id}`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth={width}
        markerHeight={width}
        orient="auto"
      >
        <line x1="5" x2="5" y1="0" y2="10" stroke={color} />
      </marker>
    </defs>
  );
}
