import PropTypes from 'prop-types';
import TetherComponent from '../../src/react-tether';

describe('propTypes', () => {
  describe('children', () => {
    const childrenProp = TetherComponent.propTypes.children;

    it('should return an error if it has no children', () => {
      const err = childrenProp(
        { children: null },
        'children',
        'TetherComponent'
      );
      expect(err).toBeInstanceOf(Error);
      expect(err.toString()).toContain('expects at least one child');
    });

    it('should return an error if it has more than 2 children', () => {
      const err = childrenProp(
        { children: [1, 2, 3] },
        'children',
        'TetherComponent'
      );
      expect(err).toBeInstanceOf(Error);
      expect(err.toString()).toContain('Only a max of two children allowed');
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
        { renderElementTo: TetherComponent.propTypes.renderElementTo },
        { renderElementTo: 'a string' },
        'renderElementTo',
        'TetherComponent'
      );
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('accepts objects with the appendChild method', () => {
      PropTypes.checkPropTypes(
        { renderElementTo: TetherComponent.propTypes.renderElementTo },
        { renderElementTo: { appendChild: () => {} } },
        'renderElementTo',
        'TetherComponent'
      );
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('only accepts appendChild as a function', () => {
      PropTypes.checkPropTypes(
        { renderElementTo: TetherComponent.propTypes.renderElementTo },
        { renderElementTo: { appendChild: true } },
        'renderElementTo',
        'TetherComponent'
      );
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
