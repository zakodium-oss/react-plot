# Changelog

### [0.3.1](https://www.github.com/zakodium/react-plot/compare/v0.3.0...v0.3.1) (2020-12-14)


### Bug Fixes

* **types:** allow Plot to have a single child ([6a2e585](https://www.github.com/zakodium/react-plot/commit/6a2e58500c1a3168e9186c18c6bf8642e31b61cb))

## [0.3.0](https://www.github.com/zakodium/react-plot/compare/v0.2.1...v0.3.0) (2020-12-10)


### ⚠ BREAKING CHANGES

* deletes tickFormat for avoiding colitions

### Features

* add "paddingXXX" prop to axes ([04273bf](https://www.github.com/zakodium/react-plot/commit/04273bf2aba097887e58e6a6b327f8975297ef45)), closes [#24](https://www.github.com/zakodium/react-plot/issues/24)
* allow to set boundaries on axis ([da2164e](https://www.github.com/zakodium/react-plot/commit/da2164e2f06ff93bab8a08a29d68a046a1444720))
* clip the graph instead of delete points ([4b6dccd](https://www.github.com/zakodium/react-plot/commit/4b6dccd9a501b9690fabf0f9e789733ba2b7da84))


### Bug Fixes

* missing margin values to update ([4cdd0e0](https://www.github.com/zakodium/react-plot/commit/4cdd0e076503ada443aa96ab8f08f929a540a9bb))
* objects position misscalculations ([4124d79](https://www.github.com/zakodium/react-plot/commit/4124d79b5d9fa6b5d78a3d308b4235eac07ecfb5))
* small values overload on x axis ([1aa7fd3](https://www.github.com/zakodium/react-plot/commit/1aa7fd33008038423eb3dc06194d5bbeb3010259))
* use scientific notation for large number ([29ddacc](https://www.github.com/zakodium/react-plot/commit/29ddaccb90fc1925421fd011703ff50e916d74ed))


### Performance Improvements

* defines a unique clipPath for all series ([461b99a](https://www.github.com/zakodium/react-plot/commit/461b99a4702989818167463c3799cadd13ff7b2f))

### [0.2.1](https://www.github.com/zakodium/react-plot/compare/v0.2.0...v0.2.1) (2020-12-03)


### Bug Fixes

* center axis labels on plot ([#16](https://www.github.com/zakodium/react-plot/issues/16)) ([00baa2a](https://www.github.com/zakodium/react-plot/commit/00baa2a461e1d6587055d173c6d5112b73b6c7e4))

## [0.2.0](https://www.github.com/zakodium/react-plot/compare/v0.1.0...v0.2.0) (2020-12-01)


### Features

* add label format ([7748ba8](https://www.github.com/zakodium/react-plot/commit/7748ba8fb9a873971abe16bce877555cab5ed072))
* customize space from label to axis ([018bafe](https://www.github.com/zakodium/react-plot/commit/018bafeb0b179ac75e933639d59d0d93887bbf97))

## [0.1.0](https://www.github.com/zakodium/react-plot/compare/v1.0.0...v0.1.0) (2020-11-25)


### Features

* add label style property to axis ([#12](https://www.github.com/zakodium/react-plot/issues/12)) ([794beaf](https://www.github.com/zakodium/react-plot/commit/794beaf1df6c08713b47ea563879a7d04c677cdf))


### Bug Fixes

* release with correct name ([bedeae6](https://www.github.com/zakodium/react-plot/commit/bedeae69213eac229470f6d1791714c68f3538e5))

## 0.1.0 (2020-11-23)

### Features

- add code base for axis ([885c5b2](https://www.github.com/zakodium/react-plot/commit/885c5b2f365ab2a904e5f77fd6669a9d4e6571ce))
- add heading ([f6a1f41](https://www.github.com/zakodium/react-plot/commit/f6a1f41f88a45f7d1dd87d3bfe9db3b55b73933e))
- add label to axis ([9951758](https://www.github.com/zakodium/react-plot/commit/99517584429976dfe7080112c48886e56c0d28f4))
- add markers to line ([#9](https://www.github.com/zakodium/react-plot/issues/9)) ([1503666](https://www.github.com/zakodium/react-plot/commit/1503666a10803d5021be122d61f321be93ccb3cf))
- add scale to context ([5bbd3b3](https://www.github.com/zakodium/react-plot/commit/5bbd3b3b741ac5bcb62a4caf90e069ed1b3ae56d))
- change state identification ([7c3a616](https://www.github.com/zakodium/react-plot/commit/7c3a616d2a0453066223efe1e62c5a7ae437a5d5))
- display legends ([32f043a](https://www.github.com/zakodium/react-plot/commit/32f043a7266148d260974c63903ccfde21c95018))
- initial structure implementation ([47beb45](https://www.github.com/zakodium/react-plot/commit/47beb450c67592fab89dc776d1c51103e013f61e))
- remove data boundaries on unmount of comp ([60e823c](https://www.github.com/zakodium/react-plot/commit/60e823ce12c9d3e9e5f454da2cd6331c86c9141a))
- show grids ([a9106a9](https://www.github.com/zakodium/react-plot/commit/a9106a94991b0d08f351f795ce829b4336a22589))
- use {x[], y[]} instead of {x,y}[] for data ([f06e5ce](https://www.github.com/zakodium/react-plot/commit/f06e5ce7eb6678887ca3760fab394715ca8ccb13))
- use color scales ([7960430](https://www.github.com/zakodium/react-plot/commit/79604306c846f9c152beb0ec90aaebea4ffb7392))

### Bug Fixes

- avoid overflow of grid ([6f4c795](https://www.github.com/zakodium/react-plot/commit/6f4c79530b2c7a89c6a0f0df96046550986c6fb6))
- avoid side-effects directly in render ([3992b5b](https://www.github.com/zakodium/react-plot/commit/3992b5b3ad16885ccdbc96235f2675ccd8d7e51f))
- check non null scales for axis ([a350586](https://www.github.com/zakodium/react-plot/commit/a350586bf96d6dd3c6271b096a4149001d0c5572))
- components cycle broken ([156b806](https://www.github.com/zakodium/react-plot/commit/156b8067c56c3369a93db98c34f9b105febdc347))
- context type update ([1320a92](https://www.github.com/zakodium/react-plot/commit/1320a92fbe30b36ab98326c3e408f78c2446d24e))
- Display plot on storybook ([1e986ba](https://www.github.com/zakodium/react-plot/commit/1e986bab0af7c8e2d0edd90788af5a8c47441cf2))
- importation types ([20ce44f](https://www.github.com/zakodium/react-plot/commit/20ce44f930b9ad4ccf04172d4e5500ad43a2a530))
- padding on axis text ([90f3145](https://www.github.com/zakodium/react-plot/commit/90f314569b375fa82ed2e1b570ae1229d1f9fe85))
- send props to axis using context ([e58d887](https://www.github.com/zakodium/react-plot/commit/e58d88761aa37472b2947625298bbc3d87fa4ff1))
