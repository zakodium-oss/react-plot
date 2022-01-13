# Changelog

## [0.12.0](https://www.github.com/zakodium/react-plot/compare/v0.11.0...v0.12.0) (2022-01-13)


### ⚠ BREAKING CHANGES

* update annotations props names (#224)
* reimplement plot rendering with auto-sizing (#203)

### Features

* add color prop to annotation arrow  ([#231](https://www.github.com/zakodium/react-plot/issues/231)) ([989ad21](https://www.github.com/zakodium/react-plot/commit/989ad21cb57e73e9e6f3cc3c873abe6d5e2046c2))
* add onMouseUp, onMouseDown and onDoubleClick callbacks ([3dc68cc](https://www.github.com/zakodium/react-plot/commit/3dc68cc028d764a981f5a3674ddcacd93680fe19))
* support alignment of annotation groups ([#223](https://www.github.com/zakodium/react-plot/issues/223)) ([0a46e11](https://www.github.com/zakodium/react-plot/commit/0a46e110613affe3bf5b29c91fe01011ac9cba62))
* tickLabelFormat callback in axis component  ([#220](https://www.github.com/zakodium/react-plot/issues/220)) ([352dfe5](https://www.github.com/zakodium/react-plot/commit/352dfe57b601b1dd225bffb8c4e7114e6d3072f0))
* update annotations props names ([#224](https://www.github.com/zakodium/react-plot/issues/224)) ([9344269](https://www.github.com/zakodium/react-plot/commit/93442698458bc7947b279cee8bca94e79c8c9096))


### Code Refactoring

* reimplement plot rendering with auto-sizing ([#203](https://www.github.com/zakodium/react-plot/issues/203)) ([ee1483d](https://www.github.com/zakodium/react-plot/commit/ee1483d248e5585a7a48c54c7c31eb8ca50db30a))

## [0.11.0](https://www.github.com/zakodium/react-plot/compare/v0.10.2...v0.11.0) (2021-11-02)


### Features

* add relative position to line annotation ([#195](https://www.github.com/zakodium/react-plot/issues/195)) ([f1ce10c](https://www.github.com/zakodium/react-plot/commit/f1ce10c2d0e1dcc795eb2e8864624c309e003dbb))

### [0.10.2](https://www.github.com/zakodium/react-plot/compare/v0.10.1...v0.10.2) (2021-10-01)


### Bug Fixes

* update dependencies and add react as peer dependency ([f935942](https://www.github.com/zakodium/react-plot/commit/f9359429a0498df88f733e318aa32068680116a8))

### [0.10.1](https://www.github.com/zakodium/react-plot/compare/v0.10.0...v0.10.1) (2021-05-07)


### Bug Fixes

* add Legend on ScatterSeries ([7ee85e3](https://www.github.com/zakodium/react-plot/commit/7ee85e3f63355312ab490d2da85b288ce33c165b))
* correctly export RangeSeriesPointType ([ccbb433](https://www.github.com/zakodium/react-plot/commit/ccbb4338bc17ddda0e57576b7453414ed47fb925))
* export BarSeriesProps ([b97cda9](https://www.github.com/zakodium/react-plot/commit/b97cda9a57e30c728dfe1c3e3b0e75585188bd7a))
* improve validation of Plot children ([0e7db4b](https://www.github.com/zakodium/react-plot/commit/0e7db4bc8c3f74fa581d58303217baaa36dc9b2a))

## [0.10.0](https://www.github.com/zakodium/react-plot/compare/v0.9.0...v0.10.0) (2021-04-21)


### Features

* add annotations as children to PlotObject ([241c941](https://www.github.com/zakodium/react-plot/commit/241c941523e2be94e614b92efd21afdfb61f7d47))
* add annotations to plotObject ([4a6ade9](https://www.github.com/zakodium/react-plot/commit/4a6ade945d57572117b5653020c1eba20345c67d))


### Bug Fixes

* shape story out of viewport ([a5a9c29](https://www.github.com/zakodium/react-plot/commit/a5a9c29cb6469f86a4d36417886f8bb42923d4e3))

## [0.9.0](https://www.github.com/zakodium/react-plot/compare/v0.8.0...v0.9.0) (2021-04-20)


### Features

* allow parallel axes in plotObject ([40f8889](https://www.github.com/zakodium/react-plot/commit/40f8889574a7927c7eb20d2f934352bc97bd6390))
* create a parallel axis with style ([ca7596b](https://www.github.com/zakodium/react-plot/commit/ca7596b00d30353b37f82a7df316716456a9bfff))


### Bug Fixes

* allow empty svg configuration ([6c39095](https://www.github.com/zakodium/react-plot/commit/6c390950b58cc5414f0a515587bb9f971cbba6d2))
* correctly compute position of Annotation.Shape ([d4ee0d7](https://www.github.com/zakodium/react-plot/commit/d4ee0d79a69441c25879d02040ec832fe538b154))
* remove display gridlines from parallel axis ([3b3dba5](https://www.github.com/zakodium/react-plot/commit/3b3dba5576ec95b03f39d7db59cfd7258cf0198d))
* uses pixels position to determine closest ([5e5042a](https://www.github.com/zakodium/react-plot/commit/5e5042a671e3b293089694f1c53f112ee19fb046))

## [0.8.0](https://www.github.com/zakodium/react-plot/compare/v0.7.1...v0.8.0) (2021-04-14)


### Features

* add className to svg ([#169](https://www.github.com/zakodium/react-plot/issues/169)) ([008251c](https://www.github.com/zakodium/react-plot/commit/008251c36f737867f3dd06058e70c6478cfb8f26))
* add tracking component ([#171](https://www.github.com/zakodium/react-plot/issues/171)) ([361bd03](https://www.github.com/zakodium/react-plot/commit/361bd0396c4f21821c19de1ea7861e0db41e9f8f))

### [0.7.1](https://www.github.com/zakodium/react-plot/compare/v0.7.0...v0.7.1) (2021-03-29)


### Bug Fixes

* do not show legend if series is hidden ([#163](https://www.github.com/zakodium/react-plot/issues/163)) ([d1e57eb](https://www.github.com/zakodium/react-plot/commit/d1e57eb0765ab53bda67675de556265cc6bcfcff))

## [0.7.0](https://www.github.com/zakodium/react-plot/compare/v0.6.0...v0.7.0) (2021-03-29)


### Features

* add logscale to left axis ([056a605](https://www.github.com/zakodium/react-plot/commit/056a605a9361a56501dda7c75ffc5104287ef7aa))
* add Range Series component ([#149](https://www.github.com/zakodium/react-plot/issues/149)) ([b7acda8](https://www.github.com/zakodium/react-plot/commit/b7acda8173e3e30985329ee2e5db96100afa2d8f))
* initial implementation of log axis ([14acded](https://www.github.com/zakodium/react-plot/commit/14acded701e9310595e286bcf68bec48fa64f5d4))


### Bug Fixes

* add missing hiddensecondaryticks on logscale ([0ada873](https://www.github.com/zakodium/react-plot/commit/0ada8734179021616063cbd1374582ef2c792676))

## [0.6.0](https://www.github.com/zakodium/react-plot/compare/v0.5.0...v0.6.0) (2021-03-09)


### ⚠ BREAKING CHANGES

* The PlotProps `style` and `viewportStyle` props were renamed to `plotViewportStyle` and `seriesViewportStyle`, respectively.

### Features

* add Annotation components ([#137](https://www.github.com/zakodium/react-plot/issues/137)) ([b56b734](https://www.github.com/zakodium/react-plot/commit/b56b73403735b59635756ed043fd6d225513dbc9))
* add bar series component ([#130](https://www.github.com/zakodium/react-plot/issues/130)) ([6e3d213](https://www.github.com/zakodium/react-plot/commit/6e3d21329cbd867fb05cb5d85c0576d700be867a)), closes [#77](https://www.github.com/zakodium/react-plot/issues/77)
* add error bars  ([#141](https://www.github.com/zakodium/react-plot/issues/141)) ([8a6688c](https://www.github.com/zakodium/react-plot/commit/8a6688c8c2868f89037e30e3fbab8f54723ce47b))
* add secondary ticks  ([#128](https://www.github.com/zakodium/react-plot/issues/128)) ([2a8f0ac](https://www.github.com/zakodium/react-plot/commit/2a8f0ac4a79b4760d5a92ebb61121462712e9885)), closes [#116](https://www.github.com/zakodium/react-plot/issues/116)
* improve documentation of Plot and add "svgStyle" prop ([be1c039](https://www.github.com/zakodium/react-plot/commit/be1c0398f7e0dcb52d80394506491ffbed487d2e))


### Bug Fixes

* remove legend on unmount ([#145](https://www.github.com/zakodium/react-plot/issues/145)) ([3002c11](https://www.github.com/zakodium/react-plot/commit/3002c11c2ba75873fd7c74c16270454e239aaaa8))
* remove the stroke color from a Marker ([#144](https://www.github.com/zakodium/react-plot/issues/144)) ([aab12af](https://www.github.com/zakodium/react-plot/commit/aab12af970785ff451352dd515e2716cb1ea236a)), closes [#138](https://www.github.com/zakodium/react-plot/issues/138)
* throw error if width or height are undefined ([#129](https://www.github.com/zakodium/react-plot/issues/129)) ([9f5cbaa](https://www.github.com/zakodium/react-plot/commit/9f5cbaa6db1135cb3f417f31bf14306564b0736c))
* Tick text aligned according to ticks length ([#142](https://www.github.com/zakodium/react-plot/issues/142)) ([4bb9335](https://www.github.com/zakodium/react-plot/commit/4bb9335bc1df6b994e3275651a8f035efb6b354e)), closes [#139](https://www.github.com/zakodium/react-plot/issues/139)
* typo on dimensions ([#146](https://www.github.com/zakodium/react-plot/issues/146)) ([0f8f1ce](https://www.github.com/zakodium/react-plot/commit/0f8f1ce132fa2e0921ee4f7738b27edcecb11db0))
* use align group to align embedded legend ([ed6c1c2](https://www.github.com/zakodium/react-plot/commit/ed6c1c29d91ac2d53d01275ccd16ee6f2a37fd2f))


### Code Refactoring

* rename style and viewportStyle props ([ecdc727](https://www.github.com/zakodium/react-plot/commit/ecdc72736c554b5a5b1c56c6c9fd1b5350abad3f))

## [0.5.0](https://www.github.com/zakodium/react-plot/compare/v0.4.0...v0.5.0) (2021-01-27)


### Features

* add more shapes ([#125](https://www.github.com/zakodium/react-plot/issues/125)) ([f5f4a18](https://www.github.com/zakodium/react-plot/commit/f5f4a185ddb7962f440a6938adb2939e1e00c6af)), closes [#113](https://www.github.com/zakodium/react-plot/issues/113)
* add some features to the Legend (impl a Context) ([380b717](https://www.github.com/zakodium/react-plot/commit/380b717e3903e598427a6dd25fbc50cda2086d4a)), closes [#108](https://www.github.com/zakodium/react-plot/issues/108)
* add style prop to Plot ([#117](https://www.github.com/zakodium/react-plot/issues/117)) ([ce9f3f2](https://www.github.com/zakodium/react-plot/commit/ce9f3f26d4f90a9190aba74fc6399721697c5bce))
* export public types ([#112](https://www.github.com/zakodium/react-plot/issues/112)) ([f88277c](https://www.github.com/zakodium/react-plot/commit/f88277cf959c9b162bc2c8758441a31f4f76afdb))


### Bug Fixes

* add default color to not be "red" on Legend ([2ea34d2](https://www.github.com/zakodium/react-plot/commit/2ea34d2bf4dd350a04fe970f114b91d0bf8dce62))
* add generated color to the shape too ([17192e4](https://www.github.com/zakodium/react-plot/commit/17192e454dfb29aa2e002b13fb8f3d347adeb9af)), closes [#108](https://www.github.com/zakodium/react-plot/issues/108)
* apply fill-opacity before user styles ([fbd0ea9](https://www.github.com/zakodium/react-plot/commit/fbd0ea9857087e57367c33cf922cf36a9210b291))
* avoid ticks overlap  ([#124](https://www.github.com/zakodium/react-plot/issues/124)) ([ee12c40](https://www.github.com/zakodium/react-plot/commit/ee12c401f90919f4114e98d6d51a50e3391e4769)), closes [#115](https://www.github.com/zakodium/react-plot/issues/115)
* change the Legend to use the marker ([005f689](https://www.github.com/zakodium/react-plot/commit/005f6899fb798fc89682ee8f9da2a8d5d2be1e60)), closes [#108](https://www.github.com/zakodium/react-plot/issues/108)

## [0.4.0](https://www.github.com/zakodium/react-plot/compare/v0.3.0...v0.4.0) (2021-01-22)


### Features

* add IR spectrum storybook ([230376a](https://www.github.com/zakodium/react-plot/commit/230376afc4ba4feec49637582c52375d460ddfc7))
* add option for getting ticks inside the axis ([9e4ace7](https://www.github.com/zakodium/react-plot/commit/9e4ace75fb6baafed2131ab39fdff68dcfdbb5d1))
* add scatter plot option ([73567a0](https://www.github.com/zakodium/react-plot/commit/73567a022c6254fa62172ae8124fd9bd19327c56))
* add scatter plot to PlotObject options ([528760e](https://www.github.com/zakodium/react-plot/commit/528760eeeae8aaeab2334c14f4a448733eb17e80))
* add showTicks props on Axis ([#84](https://www.github.com/zakodium/react-plot/issues/84)) ([64563c3](https://www.github.com/zakodium/react-plot/commit/64563c35b501005afe0026b926ddc48c3fe14061))
* add story to addons ([0a14f67](https://www.github.com/zakodium/react-plot/commit/0a14f678319e4bb59b6013150b1c80de9b542ed9))
* add tick length ([092e109](https://www.github.com/zakodium/react-plot/commit/092e109a96b87f5d35dfb6602777d90df4d8aa34))
* add tick style modifiers ([8329f0d](https://www.github.com/zakodium/react-plot/commit/8329f0d40f8297e687012106bad8a6454edc0104))
* add viewport style ([#67](https://www.github.com/zakodium/react-plot/issues/67)) ([6f84e14](https://www.github.com/zakodium/react-plot/commit/6f84e1424b10d3c18a5ea6aa5fedec9467beb283))
* adds a single prop component to render plot ([320d68b](https://www.github.com/zakodium/react-plot/commit/320d68bc2d6446912818b941991ed6773da9c52f))
* allow legend position inside plot ([#87](https://www.github.com/zakodium/react-plot/issues/87)) ([18f468f](https://www.github.com/zakodium/react-plot/commit/18f468fdea0f60169d1e51c847168eb2275a75cb))
* allow to add axis in different position ([9f46934](https://www.github.com/zakodium/react-plot/commit/9f46934cecf5cb4ef1087e2f97de0edd5ee6b186))
* allows to hide series and specify serie id ([#68](https://www.github.com/zakodium/react-plot/issues/68)) ([571da6b](https://www.github.com/zakodium/react-plot/commit/571da6b92e27145b80bec88d0843d00f31288ddd))
* create VerticalText component & add vertical-text on cursor ([#96](https://www.github.com/zakodium/react-plot/issues/96)) ([3c0a4c6](https://www.github.com/zakodium/react-plot/commit/3c0a4c6f3b930171a2820e3e2ad874adbac55f91))
* flip axis ([1a62250](https://www.github.com/zakodium/react-plot/commit/1a62250bc338b8c3e7e856fb9c6297625153ddb8)), closes [#23](https://www.github.com/zakodium/react-plot/issues/23)
* hidde or display axis ([426de9c](https://www.github.com/zakodium/react-plot/commit/426de9c99697b980cac0b880cd015f4191518bd3)), closes [#34](https://www.github.com/zakodium/react-plot/issues/34)
* marker style allows to a property to be a function ([960103b](https://www.github.com/zakodium/react-plot/commit/960103ba0f71b8c2c7107dc3648c6bb956580767))
* multiple axis ([b628cd3](https://www.github.com/zakodium/react-plot/commit/b628cd32d2dc23b91604667d51017cfab52f1493))
* use camel case for ticks style ([fc27982](https://www.github.com/zakodium/react-plot/commit/fc27982e26c897ad588ef5e49909e4c2e3973b76))


### Bug Fixes

* add dominantBaseline on Ticks ([#91](https://www.github.com/zakodium/react-plot/issues/91)) ([3978abe](https://www.github.com/zakodium/react-plot/commit/3978abe62925921534a9401a006cfc9d8cf7404a))
* color match label and plot ([9db3451](https://www.github.com/zakodium/react-plot/commit/9db3451a9180d837684450ea16ab67b216ac4a9b))
* margin optional in plots ([569dcc8](https://www.github.com/zakodium/react-plot/commit/569dcc889898a9ca06c5b4b1fd54adf1cd3892ef)), closes [#36](https://www.github.com/zakodium/react-plot/issues/36)
* missing validation on lineseries ([e774dc2](https://www.github.com/zakodium/react-plot/commit/e774dc28d4ca1c69f80eff5504c1d39e2b41a617))
* preffer named groups in regex ([b2e5ec2](https://www.github.com/zakodium/react-plot/commit/b2e5ec2d4a7c878439cd7f474098db5b2c1806dc))
* remove axis from state on unmount ([4041a01](https://www.github.com/zakodium/react-plot/commit/4041a01eb27e121be6ba0faa5b2a6b839d4c2078))
* rename variables on text ([67ab11e](https://www.github.com/zakodium/react-plot/commit/67ab11ef0be83958de1c10238e6829be8270e22d))
* set the marker to be in front of line ([#107](https://www.github.com/zakodium/react-plot/issues/107)) ([7e0cd37](https://www.github.com/zakodium/react-plot/commit/7e0cd3796b8dbd6852d58836a9cf667dcc1599eb)), closes [#103](https://www.github.com/zakodium/react-plot/issues/103)
* ticks text positions ([435c2da](https://www.github.com/zakodium/react-plot/commit/435c2da978b746cb75c1ce769621326f61bed6f6))
* update broken dependency ([a17ae88](https://www.github.com/zakodium/react-plot/commit/a17ae88a6e3a69c3ae566eea1f62a737e3008793))
* update ir storybook for percentage ([2550380](https://www.github.com/zakodium/react-plot/commit/255038052d96d47a186973aa5532b502c20085b0))
* use id of serie instead label for color ([67274db](https://www.github.com/zakodium/react-plot/commit/67274db7dd5d3d0d40211843e9ec3b2025b37ebe)), closes [#37](https://www.github.com/zakodium/react-plot/issues/37)
* use of id for color scaler instead of labels ([fba975e](https://www.github.com/zakodium/react-plot/commit/fba975ea11475868cac18f3999ce501a343b44ed))
* vertical center ticks text ([efadc85](https://www.github.com/zakodium/react-plot/commit/efadc85754d51320e588568a05d8e8ff1ae52e10))
* **types:** allow Plot to have a single child ([6a2e585](https://www.github.com/zakodium/react-plot/commit/6a2e58500c1a3168e9186c18c6bf8642e31b61cb))


### Performance Improvements

* use memoification for mappin series ([7013491](https://www.github.com/zakodium/react-plot/commit/7013491ec26cc1e7a3ff4c2a3e6120ad74faa1f1))

## [0.3.0](https://www.github.com/zakodium/react-plot/compare/v0.2.1...v0.3.0) (2020-12-10)

### ⚠ BREAKING CHANGES

- deletes tickFormat for avoiding colitions

### Features

- add "paddingXXX" prop to axes ([04273bf](https://www.github.com/zakodium/react-plot/commit/04273bf2aba097887e58e6a6b327f8975297ef45)), closes [#24](https://www.github.com/zakodium/react-plot/issues/24)
- allow to set boundaries on axis ([da2164e](https://www.github.com/zakodium/react-plot/commit/da2164e2f06ff93bab8a08a29d68a046a1444720))
- clip the graph instead of delete points ([4b6dccd](https://www.github.com/zakodium/react-plot/commit/4b6dccd9a501b9690fabf0f9e789733ba2b7da84))

### Bug Fixes

- missing margin values to update ([4cdd0e0](https://www.github.com/zakodium/react-plot/commit/4cdd0e076503ada443aa96ab8f08f929a540a9bb))
- objects position misscalculations ([4124d79](https://www.github.com/zakodium/react-plot/commit/4124d79b5d9fa6b5d78a3d308b4235eac07ecfb5))
- small values overload on x axis ([1aa7fd3](https://www.github.com/zakodium/react-plot/commit/1aa7fd33008038423eb3dc06194d5bbeb3010259))
- use scientific notation for large number ([29ddacc](https://www.github.com/zakodium/react-plot/commit/29ddaccb90fc1925421fd011703ff50e916d74ed))

### Performance Improvements

- defines a unique clipPath for all series ([461b99a](https://www.github.com/zakodium/react-plot/commit/461b99a4702989818167463c3799cadd13ff7b2f))

### [0.2.1](https://www.github.com/zakodium/react-plot/compare/v0.2.0...v0.2.1) (2020-12-03)

### Bug Fixes

- center axis labels on plot ([#16](https://www.github.com/zakodium/react-plot/issues/16)) ([00baa2a](https://www.github.com/zakodium/react-plot/commit/00baa2a461e1d6587055d173c6d5112b73b6c7e4))

## [0.2.0](https://www.github.com/zakodium/react-plot/compare/v0.1.0...v0.2.0) (2020-12-01)

### Features

- add label format ([7748ba8](https://www.github.com/zakodium/react-plot/commit/7748ba8fb9a873971abe16bce877555cab5ed072))
- customize space from label to axis ([018bafe](https://www.github.com/zakodium/react-plot/commit/018bafeb0b179ac75e933639d59d0d93887bbf97))

## [0.1.0](https://www.github.com/zakodium/react-plot/compare/v1.0.0...v0.1.0) (2020-11-25)

### Features

- add label style property to axis ([#12](https://www.github.com/zakodium/react-plot/issues/12)) ([794beaf](https://www.github.com/zakodium/react-plot/commit/794beaf1df6c08713b47ea563879a7d04c677cdf))

### Bug Fixes

- release with correct name ([bedeae6](https://www.github.com/zakodium/react-plot/commit/bedeae69213eac229470f6d1791714c68f3538e5))

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
