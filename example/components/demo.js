import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import TetherComponent from '../../src/react-tether';
import Target from './target';
import Tooltip from './tooltip';

const DraggableTarget = ({ color, height, width, ...props }) => (
  <Draggable {...props}>
    <Target color={color} height={height} width={width} />
  </Draggable>
);

const Text = styled.p`
  color: #fff;
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
  font-size: 1rem;
  display: block;
  margin: 0.5rem;
  text-align: center;
`;

export default class Demo extends React.Component {
  tether = null;
  container = null;

  componentDidMount() {
    // Rerender with the container ref
    this.setState({});
  }

  render() {
    return (
      <div
        ref={container => (this.container = container)}
        style={{ height: '100%' }}
      >
        {this.container && (
          <TetherComponent
            ref={tether => (this.tether = tether)}
            attachment="middle left"
            constraints={[
              {
                to: this.container,
                attachment: 'together',
              },
            ]}
          >
            <DraggableTarget
              height={100}
              width={100}
              color="red"
              bounds="parent"
              onDrag={() => this.tether.position()}
              defaultPosition={{ x: 25, y: 25 }}
            />
            <Tooltip>
              <Text>Drag the box around</Text>
              <Text>I'll stay within the outline</Text>
            </Tooltip>
          </TetherComponent>
        )}
      </div>
    );
  }
}
