# react-plot

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Render 2dplot partition in react.

## [Storybook](https://zakodium.github.io/react-plot/)

```ts
interface DataPoints {
  x: Array<number>;
  y: Array<number>;
  label?: string;
  color?: string;
}

interface DataAxis {
  label: string;
  units?: string;
  displayGrid?: boolean;
  logarithmic?: boolean;
}

const Example = (data: DataPoints, axis: DataAxis) => (
  <Plot data={data} axis={axis} />
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
