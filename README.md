## React Tether 0.2.0

[![Dependency Status](https://david-dm.org/souporserious/react-tether.svg)](https://david-dm.org/souporserious/react-tether)

React wrapper around [Tether](https://github.com/hubspot/tether) from Hub Spot.

## Install

`npm install react-tether --save`

`bower install react-tether --save`

## Example Usage

```javascript
import TetherComponent from 'react-tether'

class SimpleDemo extends Component {
  state = {
    isOpen: false
  }

  render() {
    const { isOpen, vertical, horizontal } = this.state

    return(
      <TetherComponent
        target={this.refs.target}
        options={{
          attachment: 'bottom center',
          constraints: [
            {
              to: 'scrollParent',
              attachment: 'together'
            }
          ]
        }}
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