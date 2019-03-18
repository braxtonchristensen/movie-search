import React from 'react';
import renderer from 'react-test-renderer';
import PosterList from '../index';
import Poster, { PosterSize } from '../../poster';

describe('<PosterList />', () => {
  describe('snapshots', () => {
    it('should match snapshot', () => {
      const rendered = renderer.create(
        <PosterList>
          <Poster
            size={ PosterSize.S }
            path="/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/4RnCeRzvI1xk5tuNWjpDKzSnJDk.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/3PEAkZHa8ehfUkuKbzmQNRTTAAs.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/zDJ4GVch7Iw2i0j84ceoElRUZUR.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/4RnCeRzvI1xk5tuNWjpDKzSnJDk.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/3PEAkZHa8ehfUkuKbzmQNRTTAAs.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
          <Poster
            size={ PosterSize.S }
            path="/zDJ4GVch7Iw2i0j84ceoElRUZUR.jpg"
            title="This will be dynamic and will be used for accessibility"
          />
        </PosterList>
      ).toJSON();

      expect(rendered).toMatchSnapshot();
    });
  });
});
