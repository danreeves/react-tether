## CHANGELOG

# 2.0.8

- Add React 17 to the supported versions.
- Some CI housekeeping

# 2.0.7

- Make RenderProp typing more generic (#221) Thanks @leabaertschi

# 2.0.6

- Add offset to Typescript definitions (#219) Thanks @tomeightyeight

# 2.0.5

- Add targetAttachment to Typescript definitions (#217). Thanks @ilyamkin

# 2.0.4

- Added constraints property to Typescript type definitions. Thanks @JabbyPanda
- Improved stability of class names on the tethered element. Thanks @j3tan

# 2.0.3

- Fixed target rendering in SSR. Thanks @reintroducing

# 2.0.2

- Fixed attachment property in TypeScript defintion. Thanks @dylan-baskind

### 2.0.1

- Fix unnecessary DOM mutations in render, which caused unexpected behaviour. Thanks @NilSet

### 2.0.0

**Breaking changes**
New API which supports React Suspense and Concurrent rendering. See the README for the new render prop based API. Please not that you now have to manually pass refs to your components.

This change also comes with a deprecation of older versions of React. If you want to use 2+ you must be on React 16.3+. For older versions please stick to version 1 of react-tether or see the [1.x branch](https://github.com/danreeves/react-tether/tree/1.x).

A big thanks to @CorinChappy for all their work on this!

### 1.0.4

- Fixed passing of event arguments to onUpdate and onRepositioned. Thanks @minznerjosh
- Improved TypeScript definition. Thanks @minznerjosh

### 1.0.3

- Added some missing props in the TypeScript definition. Thanks to @flacerdk

### 1.0.2

- Some rendering optimisations (#189). Thanks to @eaglus

### 1.0.1

- Add `className` to the TypeScript definition for the TetherComponent. Thanks @ryprice

### 1.0.0

- Use `React.createPortal` :tada: Big thanks to @doronbrikman for their work on this. In versions where `createPortal` isn't available we still fall back to the old method.
- Default export has changed: You can now use the default export in ES Modules and TypeScript, but in CommonJS environments you'll have to use `require('react-tether').default`. See [the examples](./example/tests/).
- TypeScript definition file built in
- Upgrade to Webpack 4 for the UMD distribution. Smaller bundle sizes!
- Internal: New unit and E2E tests with code coverage, a [new demo page](https://danreeves.github.io/react-tether/), linting and prettier applied to the source, publishing less files to npm.
- :crying_cat_face: Dropped bower support. Recommended upgrade path is either npm or [unpkg](https://unpkg.com/react-tether@0.6.1/lib/react-tether.js)

### 0.6.1

- Upgrade tether to 1.4.3 [#63](https://github.com/danreeves/react-tether/pull/63)

### 0.6.0

- Update compatibility for React 16 [#57](https://github.com/souporserious/react-tether/pull/57)
- Update repo to point at danreeves/react-tether

### 0.5.7

Update the target node when updating the component [PR #48](https://github.com/souporserious/react-tether/pull/48)

Compatibility React 15.5.0 [PR #49](https://github.com/souporserious/react-tether/pull/49)

### 0.5.6

Properly call `onUpdate` and `onRepositioned` [PR #40](https://github.com/souporserious/react-tether/pull/40)

Only render subtree if `destroy` method was not called yet [PR #41](https://github.com/souporserious/react-tether/pull/41)

Use `babel-plugin-add-module-exports` for `dist` files

### 0.5.5

Add `.npmignore` [PR #39](https://github.com/souporserious/react-tether/pull/39)

### 0.5.4

Expose Tether event system as imperative and props API [PR #30](https://github.com/souporserious/react-tether/pull/30)

Update tether version to 1.3.7 [PR #32](https://github.com/souporserious/react-tether/pull/32)

Attachment positions [PR #33](https://github.com/souporserious/react-tether/pull/33)

### 0.5.2

Better `renderElementTo` [PR #19](https://github.com/souporserious/react-tether/pull/19)

Use `Children.toArray` instead of `Children.forEach` to get individual children

### 0.5.1

Fixed Tether element props not being re-rendered on change

### 0.5.0

Added the ability to apply an `id`, `className`, or `style` to the wrapper Tether element.

### 0.4.0

Fixes:
`renderElementTo` now uses `document.querySelector`

Add dependency warning for people using old school script tags

### 0.3.3

Fix ASI issue with document.body [PR #12](https://github.com/souporserious/react-tether/pull/12)

### 0.3.2

Fixes:

- Unmount node only if it was mounted [#8](https://github.com/souporserious/react-tether/issues/8)
- Lazily evaluate document.body [#6](https://github.com/souporserious/react-tether/issues/6)
- Server-side rendering [#4](https://github.com/souporserious/react-tether/issues/4)

### 0.3.1

Fix tethered element not being positioned correctly

### 0.3.0

All [Tether options](http://tether.io/#options) are now props

`renderElementTag` prop to specify which DOM tag to use to render the second child to

`renderElementTo` prop to specify where in the DOM the element should be appended to

Added `position` public method from Tether

removed `shallowCompare`

### 0.2.0

Bower exposed lib name renamed to `TetherComponent` from `TetherElement`

New API accepts a max of two children. First child is used as the target and second child is used as the element that is being tethered.
