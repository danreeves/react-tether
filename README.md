## React Tether 0.3.0

[![Dependency Status](https://david-dm.org/souporserious/react-tether.svg)](https://david-dm.org/souporserious/react-tether)

React wrapper around [Tether](https://github.com/hubspot/tether) from Hub Spot.

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
        <button onClick={() => {this.setState({isOpen: !isOpen})}}>
          Toggle Tethered Content
        </button>
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

#### `options`: PropTypes.object.isRequired

Accepts [Tether options](http://tether.io/#options).

#### `children`: PropTypes.node.isRequired (2 Max)

The first child is used as the Tether's `target` and the second child (which is optional) is used as Tether's `element` that will be moved.

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