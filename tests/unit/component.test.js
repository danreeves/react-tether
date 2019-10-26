import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import TetherComponent from '../../src/react-tether';

const hasCreatePortal = ReactDOM.createPortal !== undefined;

describe('TetherComponent', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it('should render the first child', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    expect(wrapper.find('#child1').exists()).toBeTruthy();
  });

  if (hasCreatePortal) {
    it('should render the second child', () => {
      wrapper = mount(
        <TetherComponent attachment="top left">
          <div id="child1" />
          <div id="child2" />
        </TetherComponent>
      );
      expect(wrapper.find('#child2').exists()).toBeTruthy();
    });
  } else {
    it('should not render the second child', () => {
      wrapper = mount(
        <TetherComponent attachment="top left">
          <div id="child1" />
          <div id="child2" />
        </TetherComponent>
      );
      expect(wrapper.find('#child2').exists()).toBeFalsy();
    });
  }

  it('should create a tether element', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    const tetherElement = document.querySelector('.tether-element');
    expect(tetherElement).toBeTruthy();
  });

  it('should render the second child in the tether element', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    const child2 = document.querySelector('.tether-element #child2');
    expect(child2).toBeTruthy();
  });

  it('should render a single child', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
      </TetherComponent>
    );
    expect(wrapper.find('#child1').exists()).toBeTruthy();
  });

  it('should not create a tether element if there is a single child', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
      </TetherComponent>
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should not create a tether element if there is no target', () => {
    wrapper = mount(
      <TetherComponent attachment="top left">
        {null}
        <div id={'child2'} />
      </TetherComponent>
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should not create a tether element if there is no dom node for target', () => {
    const FalsyComponent = () => null;
    wrapper = mount(
      <TetherComponent attachment="top left">
        <FalsyComponent />
        <FalsyComponent />
      </TetherComponent>
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should destroy the tether element if the first/second child is unmounted', () => {
    class ToggleComponent extends React.Component {
      state = { firstOn: true, secondOn: true };

      render() {
        return (
          <TetherComponent attachment="top left">
            {this.state.firstOn && <div id="child1" />}
            {this.state.secondOn && <div id="child2" />}
          </TetherComponent>
        );
      }
    }
    wrapper = mount(<ToggleComponent />);

    expect(wrapper.find('#child1').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeTruthy();
    expect(document.querySelector('.tether-element #child2')).toBeTruthy();

    wrapper.setState({ secondOn: false });

    expect(wrapper.find('#child1').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #child2')).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: true });

    expect(wrapper.find('#child1').exists()).toBeFalsy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #child2')).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: false });

    expect(wrapper.find('#child1').exists()).toBeFalsy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #child2')).toBeFalsy();
  });

  it('should add className to tether element', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        className="custom-class-1 custom-class-2"
      >
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    const tetherElement = document.querySelector('.tether-element');
    expect(tetherElement).toBeTruthy();
    expect(tetherElement.classList.contains('custom-class-1')).toBe(true);
    expect(tetherElement.classList.contains('custom-class-2')).toBe(true);
  });

  it('should swap out classes when className changes', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        className="custom-class-1 custom-class-2"
      >
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    let tetherElement = document.querySelector('.tether-element');
    expect(tetherElement.classList.contains('custom-class-1')).toBe(true);
    expect(tetherElement.classList.contains('custom-class-2')).toBe(true);

    wrapper.setProps({
      className: 'custom-class-1 custom-class-3    custom-class-4', // Spacing is intentional
    });

    tetherElement = document.querySelector('.tether-element');
    expect(tetherElement.classList.contains('custom-class-1')).toBe(true);
    expect(tetherElement.classList.contains('custom-class-2')).toBe(false);
    expect(tetherElement.classList.contains('custom-class-3')).toBe(true);
    expect(tetherElement.classList.contains('custom-class-4')).toBe(true);
  });

  it('allows changing the tether element tag', () => {
    wrapper = mount(
      <TetherComponent attachment="top left" renderElementTag="aside">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    expect(document.querySelector('.tether-element').nodeName).toBe('ASIDE');
  });

  it('allows changing the tether element tag', () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'test-container');
    // Tether requires the container element to have position static
    container.style.position = 'static';
    document.body.appendChild(container);

    wrapper = mount(
      <TetherComponent attachment="top left" renderElementTo="#test-container">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );

    expect(document.querySelector('#test-container')).toBeTruthy();
    expect(
      document.querySelector('#test-container .tether-element')
    ).toBeTruthy();
  });

  it('passes arguments when on onUpdate() is called', () => {
    const onUpdate = jest.fn();
    const updateData = {
      attachment: { top: 'top', left: 'left' },
      targetAttachment: { top: 'bottom', left: 'right' },
    };
    wrapper = mount(
      <TetherComponent attachment="top left" onUpdate={onUpdate}>
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    wrapper
      .instance()
      .getTetherInstance()
      .trigger('update', updateData);

    expect(onUpdate).toHaveBeenCalledWith(updateData);
  });

  it('passes arguments when on onRepositioned() is called', () => {
    const onRepositioned = jest.fn();
    const updateData = {
      foo: 'foo',
      bar: 'bar',
    };
    wrapper = mount(
      <TetherComponent attachment="top left" onRepositioned={onRepositioned}>
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    wrapper
      .instance()
      .getTetherInstance()
      .trigger('repositioned', updateData);

    expect(onRepositioned).toHaveBeenCalledWith(updateData);
  });
});
