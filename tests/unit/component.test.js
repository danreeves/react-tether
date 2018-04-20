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

  it('should destroy the tether element if the second child is unmounted', () => {
    class ToggleComponent extends React.Component {
      state = { on: true };

      render() {
        return (
          <TetherComponent attachment="top left">
            <div id="child1" />
            {this.state.on && <div id="child2" />}
          </TetherComponent>
        );
      }
    }
    wrapper = mount(<ToggleComponent />);

    expect(wrapper.find('#child1').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeTruthy();
    expect(document.querySelector('.tether-element #child2')).toBeTruthy();

    wrapper.setState({ on: false });

    expect(wrapper.find('#child1').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #child2')).toBeFalsy();
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
});
