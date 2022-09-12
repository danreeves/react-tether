import React from 'react';
import {mount} from 'enzyme';
import TetherComponent from '../../src/react-tether.js';

let wrapper;
const render = () => {
	wrapper = mount(
		<TetherComponent
			attachment="top left"
			renderTarget={(ref) => <div ref={ref} id="target" />}
			renderElement={(ref) => <div ref={ref} id="element" />}
		/>,
	);
	return wrapper;
};

describe('Public API', () => {
	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
			wrapper = null;
		}
	});

	it('exposes getTetherInstance', () => {
		const instance = render().instance();
		expect(typeof instance.getTetherInstance).toBe('function');
		expect(instance.getTetherInstance().constructor.name).toBe('TetherClass');
	});

	it('exposes enable', () => {
		const instance = render().instance();
		expect(typeof instance.enable).toBe('function');
	});

	it('exposes disable', () => {
		const instance = render().instance();
		expect(typeof instance.disable).toBe('function');
	});

	it('exposes on', () => {
		const instance = render().instance();
		expect(typeof instance.on).toBe('function');
	});

	it('exposes once', () => {
		const instance = render().instance();
		expect(typeof instance.once).toBe('function');
	});

	it('exposes off', () => {
		const instance = render().instance();
		expect(typeof instance.off).toBe('function');
	});

	it('exposes position', () => {
		const instance = render().instance();
		expect(typeof instance.position).toBe('function');
	});
});
