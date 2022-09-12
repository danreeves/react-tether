import PropTypes from 'prop-types';
import TetherComponent from '../../src/react-tether.js';

describe('propTypes', () => {
	describe('children', () => {
		const childrenProp = TetherComponent.propTypes.children;

		it('should return an error if children are used', () => {
			const error = childrenProp(
				{children: [1, 2]},
				'children',
				'TetherComponent',
			);
			expect(error).toBeInstanceOf(Error);
			expect(error.toString()).toContain(
				'TetherComponent no longer uses children to render components',
			);
		});

		it('should not return an error if there are no children', () => {
			const error = childrenProp(
				{children: null},
				'children',
				'TetherComponent',
			);
			expect(error).toBeUndefined();
		});
	});

	describe('renderElementTo', () => {
		const errorSpy = jest
			.spyOn(console, 'error')
			.mockImplementation(() => () => {});

		beforeEach(() => {
			errorSpy.mockClear();
		});

		afterAll(() => {
			errorSpy.mockRestore();
		});

		it('accepts strings', () => {
			PropTypes.checkPropTypes(
				{renderElementTo: TetherComponent.propTypes.renderElementTo},
				{renderElementTo: 'a string'},
				'renderElementTo',
				'TetherComponent',
			);
			expect(errorSpy).not.toHaveBeenCalled();
		});

		it('accepts objects with the appendChild method', () => {
			PropTypes.checkPropTypes(
				{renderElementTo: TetherComponent.propTypes.renderElementTo},
				{renderElementTo: {appendChild() {}}},
				'renderElementTo',
				'TetherComponent',
			);
			expect(errorSpy).not.toHaveBeenCalled();
		});

		it('only accepts appendChild as a function', () => {
			PropTypes.checkPropTypes(
				{renderElementTo: TetherComponent.propTypes.renderElementTo},
				{renderElementTo: {appendChild: true}},
				'renderElementTo',
				'TetherComponent',
			);
			expect(errorSpy).toHaveBeenCalled();
		});
	});
});
