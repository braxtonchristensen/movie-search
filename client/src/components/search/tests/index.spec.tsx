import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../index';

describe('<Search />', () => {
  describe('snapshots', () => {
    it('should match snapshot', () => {
      const rendered = renderer.create(
        <Search />
      ).toJSON();

      expect(rendered).toMatchSnapshot();
    });
  });
});
