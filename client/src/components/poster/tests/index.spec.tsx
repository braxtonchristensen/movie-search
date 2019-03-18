import React from 'react';
import renderer from 'react-test-renderer';
import Poster, { PosterSize } from '../index';

describe('<Poster />', () => {
  describe('snapshots', () => {
    it('should match snapshot', () => {
      const rendered = renderer.create(
        <Poster
          size={ PosterSize.S }
          path="/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
      ).toJSON();

      expect(rendered).toMatchSnapshot();
    });
  });
});
