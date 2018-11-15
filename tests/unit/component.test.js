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

  it('should render the target', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
    );
    expect(wrapper.find('#target').exists()).toBeTruthy();
  });

  if (hasCreatePortal) {
    it('should render the element', () => {
      wrapper = mount(
        <TetherComponent
          attachment="top left"
          renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
          renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
        />
      );
      expect(wrapper.find('#element').exists()).toBeTruthy();
    });
  } else {
    it('should not render the element', () => {
      wrapper = mount(
        <TetherComponent
          attachment="top left"
          renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
          renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
        />
      );
      expect(wrapper.find('#element').exists()).toBeFalsy();
    });
  }

  it('should create a tether element', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
    );
    const tetherElement = document.querySelector('.tether-element');
    expect(tetherElement).toBeTruthy();
  });

  it('should render the second child in the tether element', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
    );
    const element = document.querySelector('.tether-element #element');
    expect(element).toBeTruthy();
  });

  it('should render a just a target', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
      />
    );
    expect(wrapper.find('#target').exists()).toBeTruthy();
  });

  it('should not create a tether element if there is no renderElement', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
      />
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should not create a tether element if there is no renderTarget', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should not create a tether element if innerRef is not bound to a dom node', () => {
    const FalsyComponent = () => null;
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderTarget={() => <FalsyComponent />}
        renderElement={() => <FalsyComponent />}
      />
    );
    expect(document.querySelector('.tether-element')).toBeFalsy();
  });

  it('should destroy the tether element if the first/second child is unmounted', () => {
    class ToggleComponent extends React.Component {
      state = { firstOn: true, secondOn: true };

      render() {
        return (
          <TetherComponent
            attachment="top left"
            renderTarget={({ innerRef }) =>
              this.state.firstOn && <div ref={innerRef} id="target" />
            }
            renderElement={({ innerRef }) =>
              this.state.secondOn && <div ref={innerRef} id="element" />
            }
          />
        );
      }
    }
    wrapper = mount(<ToggleComponent />);

    expect(wrapper.find('#target').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeTruthy();
    expect(document.querySelector('.tether-element #element')).toBeTruthy();

    wrapper.setState({ secondOn: false });

    expect(wrapper.find('#target').exists()).toBeTruthy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #element')).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: true });

    expect(wrapper.find('#target').exists()).toBeFalsy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #element')).toBeFalsy();

    wrapper.setState({ firstOn: false, secondOn: false });

    expect(wrapper.find('#target').exists()).toBeFalsy();
    expect(document.querySelector('.tether-element')).toBeFalsy();
    expect(document.querySelector('.tether-element #element')).toBeFalsy();
  });

  it('allows changing the tether element tag', () => {
    wrapper = mount(
      <TetherComponent
        attachment="top left"
        renderElementTag="aside"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
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
      <TetherComponent
        attachment="top left"
        renderElementTo="#test-container"
        renderTarget={({ innerRef }) => <div ref={innerRef} id="target" />}
        renderElement={({ innerRef }) => <div ref={innerRef} id="element" />}
      />
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
