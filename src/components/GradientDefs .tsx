export default function GradientDefs({
  colors,
  id,
}: {
  colors?: { color: string; offset: number }[];
  id: string;
}) {
  const total = colors[0].offset;

  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        {colors
          .filter(({ color }) => color)
          .map(({ color, offset }) => (
            <stop
              key={color + offset}
              offset={`${100 - (100 * offset) / total}%`}
              style={{
                stopColor: color,
                stopOpacity: '1',
              }}
            />
          ))}
      </linearGradient>
    </defs>
  );
}
