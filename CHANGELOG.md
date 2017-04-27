## CHANGELOG
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
