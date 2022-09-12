import { describe, expect, it } from "@jest/globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import TetherComponent from "../../src/react-tether";

describe("TetherComponent", () => {
  it("should render the target", () => {
    render(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref: any) => <div ref={ref} data-testid="target" />}
        renderElement={(ref: any) => <div ref={ref} data-testid="element" />}
      />
    );
    expect(screen.getByTestId("#target")).toBeInTheDocument();
  });

  it("should render the element", () => {
    render(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    expect(screen.getByTestId("#element").exists()).toBeTruthy();
  });

  it("should create a tether element", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    const tetherElement = document.querySelector(".tether-element");
    expect(tetherElement).toBeTruthy();
  });

  it("should render the second child in the tether element", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    const element = document.querySelector(".tether-element #element");
    expect(element).toBeTruthy();
  });

  it("should add className to tether element", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        className="custom-class-1 custom-class-2"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    const tetherElement = document.querySelector(".tether-element");
    expect(tetherElement).toBeTruthy();
    expect(tetherElement.classList.contains("custom-class-1")).toBe(true);
    expect(tetherElement.classList.contains("custom-class-2")).toBe(true);
  });

  it("should swap out classes when className changes", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        className="custom-class-1 custom-class-2"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    let tetherElement = document.querySelector(".tether-element");
    expect(tetherElement.classList.contains("custom-class-1")).toBe(true);
    expect(tetherElement.classList.contains("custom-class-2")).toBe(true);

    wrapper.setProps({
      className: "custom-class-1 custom-class-3    custom-class-4", // Spacing is intentional
    });

    tetherElement = document.querySelector(".tether-element");
    expect(tetherElement.classList.contains("custom-class-1")).toBe(true);
    expect(tetherElement.classList.contains("custom-class-2")).toBe(false);
    expect(tetherElement.classList.contains("custom-class-3")).toBe(true);
    expect(tetherElement.classList.contains("custom-class-4")).toBe(true);
  });

  it("should render a just a target", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
      />
    );
    expect(wrapper.find("#target").exists()).toBeTruthy();
  });

  it("should not create a tether element if there is no renderElement", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
      />
    );
    expect(document.querySelector(".tether-element")).toBeFalsy();
  });

  it("should not create a tether element if there is no renderTarget", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    expect(document.querySelector(".tether-element")).toBeFalsy();
  });

  it("should not create a tether element if ref is not bound to a dom node", () => {
    const FalsyComponent = () => null;
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={() => <FalsyComponent />}
        renderElement={() => <FalsyComponent />}
      />
    );
    expect(document.querySelector(".tether-element")).toBeFalsy();
  });

  it("should destroy the tether element if the first/second child is unmounted", () => {
    class ToggleComponent extends React.Component {
      state = { firstOn: true, secondOn: true };

      render() {
        return (
          <TetherComponent
            attachment="top left"
            renderTarget={(ref) =>
              this.state.firstOn && <div ref={ref} data-testid="target" />
            }
            renderElement={(ref) =>
              this.state.secondOn && <div ref={ref} data-testid="element" />
            }
          />
        );
      }
    }
    wrapper = mount(<ToggleComponent />);

    expect(wrapper.find("#target").exists()).toBeTruthy();
    expect(document.querySelector(".tether-element #element")).toBeTruthy();

    wrapper.setState({ secondOn: false });

    expect(wrapper.find("#target").exists()).toBeTruthy();
    expect(document.querySelector(".tether-element #element")).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: true });

    expect(wrapper.find("#target").exists()).toBeFalsy();
    expect(document.querySelector(".tether-element #element")).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: false });

    expect(wrapper.find("#target").exists()).toBeFalsy();
    expect(document.querySelector(".tether-element #element")).toBeFalsy();
  });

  it("allows changing the tether element tag", () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderElementTag="aside"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );
    expect(document.querySelector(".tether-element").nodeName).toBe("ASIDE");
  });

  it("allows changing the tether element tag on the fly", () => {
    class DifferentTagsComponent extends React.Component {
      state = { isAside: false };

      render() {
        return (
          <TetherComponent
            attachment="top left"
            renderElementTag={this.state.isAside ? "aside" : "div"}
            renderTarget={(ref) => <div ref={ref} data-testid="target" />}
            renderElement={(ref) => <div ref={ref} data-testid="element" />}
          />
        );
      }
    }
    wrapper = mount(<DifferentTagsComponent />);

    expect(document.querySelector(".tether-element").nodeName).toBe("DIV");

    wrapper.setState({ isAside: true });

    expect(document.querySelector(".tether-element").nodeName).toBe("ASIDE");
  });

  it("allows changing the tether element tag", () => {
    const container = document.createElement("div");
    container.setAttribute("id", "test-container");
    // Tether requires the container element to have position static
    container.style.position = "static";
    document.body.append(container);

    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderElementTo="#test-container"
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );

    expect(document.querySelector("#test-container")).toBeTruthy();
    expect(
      document.querySelector("#test-container .tether-element")
    ).toBeTruthy();
  });

  it("allows changing the tether element tag on the fly", () => {
    const container = document.createElement("div");
    container.setAttribute("id", "test-container");
    // Tether requires the container element to have position static
    container.style.position = "static";
    document.body.append(container);

    const container2 = document.createElement("div");
    container2.setAttribute("id", "test-container2");
    container2.style.position = "static";
    document.body.append(container2);

    class DifferentRenderElementToComponent extends React.Component {
      state = { isOne: true };

      render() {
        return (
          <TetherComponent
            attachment="top left"
            renderElementTo={
              this.state.isOne ? "#test-container" : "#test-container2"
            }
            renderTarget={(ref) => <div ref={ref} data-testid="target" />}
            renderElement={(ref) => <div ref={ref} data-testid="element" />}
          />
        );
      }
    }
    wrapper = mount(<DifferentRenderElementToComponent />);

    expect(document.querySelector("#test-container")).toBeTruthy();
    expect(
      document.querySelector("#test-container .tether-element")
    ).toBeTruthy();

    wrapper.setState({ isOne: false });

    expect(document.querySelector("#test-container2")).toBeTruthy();
    expect(
      document.querySelector("#test-container2 .tether-element")
    ).toBeTruthy();
  });

  it("passes arguments when on onUpdate() is called", () => {
    const onUpdate = jest.fn();
    const updateData = {
      attachment: { top: "top", left: "left" },
      targetAttachment: { top: "bottom", left: "right" },
    };
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        onUpdate={onUpdate}
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );

    wrapper.instance().getTetherInstance().trigger("update", updateData);

    expect(onUpdate).toHaveBeenCalledWith(updateData);
  });

  it("passes arguments when on onRepositioned() is called", () => {
    const onRepositioned = jest.fn();
    const updateData = {
      foo: "foo",
      bar: "bar",
    };
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        onRepositioned={onRepositioned}
        renderTarget={(ref) => <div ref={ref} data-testid="target" />}
        renderElement={(ref) => <div ref={ref} data-testid="element" />}
      />
    );

    wrapper.instance().getTetherInstance().trigger("repositioned", updateData);

    expect(onRepositioned).toHaveBeenCalledWith(updateData);
  });
});
