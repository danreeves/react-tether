import React from 'react';
import { shallow, mount } from 'enzyme';
import TetherComponent from '../../lib/react-tether';

const childrenProp = TetherComponent.propTypes.children;
describe('propTypes', () => {
  describe('children', () => {
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
});
