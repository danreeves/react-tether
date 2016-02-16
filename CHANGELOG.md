## CHANGELOG
### 0.3.3
Fix ASI issue with document.body [PR #12](https://github.com/souporserious/react-tether/pull/12)

### 0.3.2
Fixes the following:
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
