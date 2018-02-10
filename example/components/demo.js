import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import chroma from 'chroma-js';
import TetherComponent from '../../src/react-tether';
import Target from './target';
import Tooltip from './tooltip';

const DemoZone = styled.div`
  border: 4px solid
    ${({ theme }) =>
      chroma(theme.colors[1])
        .darken()
        .hex()};
  border-radius: 4px;
  height: 600px;
  position: relative;
`;

const DraggableTarget = ({ color, height, id, width, ...props }) => (
  <Draggable {...props}>
    <Target color={color} height={height} width={width} id={id} />
  </Draggable>
);

const Text = styled.p`
  color: ${({ theme }) => theme.lightText};
  font-family: ${({ theme }) => theme.font};
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
      <DemoZone>
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
                id="DRAG_ME"
                height={100}
                width={100}
                color="red"
                bounds="parent"
                onDrag={() => this.tether.position()}
                defaultPosition={{ x: 25, y: 25 }}
              />
              <Tooltip id="WATCH_ME">
                <Text>Drag the box around</Text>
                <Text>I'll stay within the outline</Text>
              </Tooltip>
            </TetherComponent>
          )}
        </div>
      </DemoZone>
    );
  }
}
