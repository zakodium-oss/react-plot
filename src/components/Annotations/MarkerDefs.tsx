export default function MarkerDefs() {
  return (
    <defs>
      <marker
        id="marker-triangle"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>

      <marker
        id="marker-circle"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
      >
        <circle cx="5" cy="5" r="5" fill="current" />
      </marker>

      <marker
        id="marker-line"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <line x1="5" x2="5" y1="0" y2="10" stroke="black" />
      </marker>
    </defs>
  );
}
