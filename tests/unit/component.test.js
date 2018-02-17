import React from 'react';
import { mount } from 'enzyme';
import TetherComponent from '../../lib/react-tether';

describe('TetherComponent', () => {
  it('should render the first child', () => {
    const wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    expect(wrapper.find('#child1').exists()).toBeTruthy();
  });

  it('should not render the second child', () => {
    const wrapper = mount(
      <TetherComponent attachment="top left">
        <div id="child1" />
        <div id="child2" />
      </TetherComponent>
    );
    expect(wrapper.find('#child2').exists()).toBeFalsy();
  });
});
