import React, { useRef, useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableProps } from "react-draggable";
import chroma from "chroma-js";
import TetherComponent from "../../src/react-tether";
import Target from "./target";
import Tooltip from "./tooltip";

const DemoZone = styled.div`
  border: 4px solid ${({ theme }) => chroma(theme.colors[1]).darken().hex()};
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
  color: string;
  height: number;
  id: string;
  width: number;
};
const DraggableTarget = React.forwardRef<
  HTMLDivElement,
  DraggableTargetProps & Partial<DraggableProps>
>(({ color, height, id, width, ...props }, ref) => (
  <Draggable {...props}>
    <GrabbableTarget
      ref={ref}
      color={color}
      height={height}
      width={width}
      id={id}
    />
  </Draggable>
));

const Text = styled.p`
  color: ${({ theme }) => theme.lightText};
  font-family: ${({ theme }) => theme.font};
  font-size: 1rem;
  display: block;
  margin: 0.5rem;
  text-align: center;
`;

const ToggleButton = styled.button`
  border: 4px solid ${({ theme }) => chroma(theme.colors[1]).darken().hex()};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font};
  color: ${({ theme }) => chroma(theme.colors[1]).darken().hex()};
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem;
  background-color: transparent;
  outline: none;
  &:hover {
    background-color: ${({ theme }) =>
      chroma(theme.colors[1]).alpha(0.5).css()};
    color: ${({ theme }) => chroma(theme.colors[1]).darken(1.5).hex()};
    border-color: ${({ theme }) => chroma(theme.colors[1]).darken(1.5).hex()};
    cursor: pointer;
  }
  &:active {
    background-color: ${({ theme }) => chroma(theme.colors[1]).css()};
  }
`;

const AbsoluteDiv = styled.div`
  position: absolute;
`;

const ATTACHMENTS = [
  "middle left",
  "top center",
  "middle right",
  "bottom center",
] as const;

export default function Demo() {
  const tether = useRef<TetherComponent>(null);
  const [container, setContainer] = useState<
    HTMLDivElement | (() => HTMLDivElement) | null
  >(null);

  const [on, setOn] = useState(true);
  const [attachment, setAttachment] = useState<typeof ATTACHMENTS[number]>(
    ATTACHMENTS[0]
  );

  function toggleTooltip() {
    setOn(!on);
  }

  function cycleAttachment() {
    let currentIndex = ATTACHMENTS.indexOf(attachment) || -1;
    let nextIndex = (currentIndex + 1) % ATTACHMENTS.length;
    let nextAttachment = ATTACHMENTS[nextIndex];
    if (nextAttachment && ATTACHMENTS.includes(nextAttachment)) {
      setAttachment(nextAttachment);
    }
  }

  return (
    <DemoZone>
      <AbsoluteDiv>
        <ToggleButton id="TOGGLE_TOOLTIP" onClick={toggleTooltip}>
          Toggle tooltip
        </ToggleButton>
        <ToggleButton id="CYCLE_ATTACHMENT" onClick={cycleAttachment}>
          Change side
        </ToggleButton>
      </AbsoluteDiv>
      <div ref={(ref) => setContainer(ref)} style={{ height: "100%" }}>
        {container && (
          <TetherComponent
            ref={tether}
            attachment={attachment}
            constraints={[
              {
                to: container,
                attachment: "together",
              },
            ]}
            renderTarget={(ref: any) => (
              <DraggableTarget
                ref={ref}
                id="DRAG_ME"
                height={100}
                width={100}
                color="red"
                bounds="parent"
                onDrag={() => {
                  tether.current?.getTetherInstance() &&
                    tether.current?.position();
                }}
                defaultPosition={{ x: 25, y: 125 }}
              />
            )}
            renderElement={(ref: any) =>
              on ? (
                <Tooltip ref={ref} id="WATCH_ME">
                  <Text>Drag the box around</Text>
                  <Text>I&apos;ll stay within the outline</Text>
                </Tooltip>
              ) : null
            }
          />
        )}
      </div>
    </DemoZone>
  );
}
