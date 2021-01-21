# react-plot

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Render 2dplot partition in react.

## [Storybook](https://zakodium.github.io/react-plot/)

```tsx
const Example = () => (
  <Plot
    width={550}
    height={500}
    margin={{ bottom: 50, left: 90, top: 50, right: 100 }}
  >
    <Heading
      title="Electrical characterization"
      subtitle="current vs voltage"
    />
    <LineSeries
      data={[
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ]}
      xAxis="x"
      yAxis="y"
      lineStyle={{ strokeWidth: 3 }}
      label="Vg = 7V"
      displayMarker={false}
    />
    <LineSeries
      data={[
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
      ]}
      xAxis="x"
      yAxis="y"
      displayMarker={true}
      markerShape="circle"
      label="Vg = 3V"
    />
    <Axis
      id="x"
      position="bottom"
      label="Drain voltage [V]"
      displayGridLines={true}
      max={6.1 / factor}
      tickStyle={{ fontSize: '0.8rem' }}
    />
    <Axis
      id="y"
      position="left"
      label="Drain current [mA]"
      displayGridLines={true}
      labelSpace={50}
      max={6.1 * factor}
      tickStyle={{ fontSize: '0.8rem' }}
    />
    <Legend position="right" />
  </Plot>
);
```

This code will result in this example

![Plot Example](./PlotExample.png)

## Installation

`$ npm install --save react-plot`

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/react-plot.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-plot
[download-image]: https://img.shields.io/npm/dm/react-plot.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-plot
