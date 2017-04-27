## React Tether

[![Dependency Status](https://david-dm.org/souporserious/react-tether.svg)](https://david-dm.org/souporserious/react-tether)

React wrapper around [Tether](https://github.com/hubspot/tether) from Hub Spot.

![alt tag](images/tether-demo.gif)

## Install

`npm install react-tether --save`

`bower install react-tether --save`

## Example Usage

```javascript
import TetherComponent from 'react-tether'

class SimpleDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  render() {
    const { isOpen } = this.state

    return(
      <TetherComponent
        attachment="top center"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        { /* First child: This is what the item will be tethered to */ }
        <button onClick={() => {this.setState({isOpen: !isOpen})}}>
          Toggle Tethered Content
        </button>
        { /* Second child: If present, this item will be tethered to the the first child */ }
        {
          isOpen &&
          <div>
            <h2>Tethered Content</h2>
            <p>A paragraph to accompany the title.</p>
          </div>
        }
      </TetherComponent>
    )
  }
}
```

## Props

#### `children`: PropTypes.node.isRequired (2 Max)

The first child is used as the Tether's `target` and the second child (which is optional) is used as Tether's `element` that will be moved.

#### `renderElementTag`: PropTypes.string

The tag that is used to render the Tether element, defaults to `div`.

#### `renderElementTo`: PropTypes.string

Where in the DOM the Tether element is appended. Passes in any valid selector to `document.querySelector`. Defaults to `document.body`.

#### `Tether Options`:

Any valid [Tether options](http://tether.io/#options).

## Imperative API

The following methods are exposed on the component instance:

- `getTetherInstance(): Tether`
- `disable(): void`
- `enable(): void`
- `on(event: string, handler: function, ctx: any): void`
- `once(event: string, handler: function, ctx: any): void`
- `off(event: string, handler: function): void`
- `position(): void`

#### Example usage:
```javascript
<TetherComponent ref={tether => this.tether = tether}>
  <Target/>
  <Element onResize={() => this.tether && this.tether.position()}
</TetherComponent>
```

## Run Example

clone repo

`git clone git@github.com:souporserious/react-tether.git`

move into folder

`cd ~/react-tether`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`
