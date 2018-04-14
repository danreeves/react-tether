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

const GrabbableTarget = styled(Target)`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

type DraggableTargetProps = {
  color: string,
  height: number,
  id: string,
  width: number,
};
const DraggableTarget = ({
  color,
  height,
  id,
  width,
  ...props
}: DraggableTargetProps) => (
  <Draggable {...props}>
    <GrabbableTarget color={color} height={height} width={width} id={id} />
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

const ToggleButton = styled.button`
  border: 4px solid
    ${({ theme }) =>
      chroma(theme.colors[1])
        .darken()
        .hex()};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font};
  color: ${({ theme }) =>
    chroma(theme.colors[1])
      .darken()
      .hex()};
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem;
  background-color: transparent;
  outline: none;
  &:hover {
    background-color: ${({ theme }) =>
      chroma(theme.colors[1])
        .alpha(0.5)
        .css()};
    color: ${({ theme }) =>
      chroma(theme.colors[1])
        .darken(1.5)
        .hex()};
    border-color: ${({ theme }) =>
      chroma(theme.colors[1])
        .darken(1.5)
        .hex()};
    cursor: pointer;
  }
  &:active {
    background-color: ${({ theme }) => chroma(theme.colors[1]).css()};
  }
`;

export default class Demo extends React.Component {
  tether = null;

  container = null;

  state = { on: true };

  componentDidMount() {
    // Rerender with the container ref
    this.setState({});
  }

  render() {
    return (
      <DemoZone>
        <ToggleButton
          id="CLICK_ME"
          onClick={() =>
            this.setState(({ on }) => {
              return { on: !on };
            })
          }
        >
          Toggle tooltip
        </ToggleButton>
        <div
          ref={container => {
            this.container = container;
          }}
          style={{ height: '100%' }}
        >
          {this.container && (
            <TetherComponent
              ref={tether => {
                this.tether = tether;
              }}
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
                onDrag={() =>
                  this.tether.getTetherInstance() && this.tether.position()
                }
                defaultPosition={{ x: 25, y: 25 }}
              />
              {this.state.on && (
                <Tooltip id="WATCH_ME">
                  <Text>Drag the box around</Text>
                  <Text>I&apos;ll stay within the outline</Text>
                </Tooltip>
              )}
            </TetherComponent>
          )}
        </div>
      </DemoZone>
    );
  }
}
