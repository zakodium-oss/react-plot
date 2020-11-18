# react-plot

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Render 2dplot partition in react.

## [Storybook](https://zakodium.github.io/react-plot/)

```tsx
const Example = () => (
  <Plot
    width={500}
    height={500}
    colorScheme={d3.schemePaired}
    margin={{ bottom: 50, left: 50, top: 10, right: 10 }}
  >
    <Plot.Heading
      title="Electrical characterization"
      subtitle="current vs voltage"
      titleStyle={}
      substitleStyle={}
      titleClass=""
      substitleClass=""
      position="top"
    />
    <Plot.LineSeries
      data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
      lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
      curve={d3.curveCardinal(0.5)}
      label="Vg = 7V"
    />
    <Plot.LineSeries
      data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 2, 4, 6, 6, 6] }}
      lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
      markerStyle={}
      displayMarker={true}
      label="Vg = 3V"
    />
    <Plot.XAxis label="Drain voltage [V]" showGridLines={true} />
    <Plot.YAxis label="Drain current [mA]" showGridLines={true} />
    <Plot.Legend position="right" direction="down" />
  </Plot>
);
```

## Installation

`$ npm install --save react-plot`

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/react-plot.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-plot
[download-image]: https://img.shields.io/npm/dm/react-plot.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-plot
