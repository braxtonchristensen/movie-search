import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import PosterLink, { PosterSize } from '../poster-link';

import PosterList from '.';

storiesOf('PosterList', module)
  .addDecorator(fn => (
    <BrowserRouter>
      { fn() }
    </BrowserRouter>
  ))
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <PosterList>
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/4RnCeRzvI1xk5tuNWjpDKzSnJDk.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/3PEAkZHa8ehfUkuKbzmQNRTTAAs.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/zDJ4GVch7Iw2i0j84ceoElRUZUR.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/4RnCeRzvI1xk5tuNWjpDKzSnJDk.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/3PEAkZHa8ehfUkuKbzmQNRTTAAs.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
        <PosterLink
          to='/someRoute'
          size={ PosterSize.S }
          path="/zDJ4GVch7Iw2i0j84ceoElRUZUR.jpg"
          title="This will be dynamic and will be used for accessibility"
        />
      </PosterList>
    );
  });
