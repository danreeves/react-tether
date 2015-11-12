## React Tether 0.1.2

[![Dependency Status](https://david-dm.org/souporserious/react-tether.svg)](https://david-dm.org/souporserious/react-tether)

React wrapper around [Tether](https://github.com/hubspot/tether) from Hub Spot.

## Install

`npm install react-tether --save`

`bower install react-tether --save`

## Example Usage

```javascript
import TetherElement from 'react-tether'

class App extends Component {
  state = {
    isOpen: false,
    vertical: 'left',
    horizontal: 'top'
  }

  render() {
    return(
      const { isOpen, vertical, horizontal } = this.state

      <div>
        <button
          ref="target"
          onClick={() => {this.setState({isOpen: !isOpen})}}
        >
          Toggle Tethered Content
        </button>
        {
          isOpen &&
          <TetherElement
            target={this.refs.target}
            options={{
              attachment: `${vertical} ${horizontal}`,
              constraints: [
                {
                  to: 'scrollParent',
                  attachment: 'together'
                }
              ]
            }}
          >
            <div>
              <h2>Tethered Content</h2>
              <p>A paragraph to accompany the title.</p>
            </div>
          </TetherElement>
        }
      </div>
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