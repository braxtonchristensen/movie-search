import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import Poster, { PosterSize } from '.';

const sizes = ['w185', 'w342', 'w500', 'w780', 'original'] as PosterSize[]
const paths = [
  '/gpxjoE0yvRwIhFEJgNArtKtaN7S.jpg',
  '/4RnCeRzvI1xk5tuNWjpDKzSnJDk.jpg',
  '/3PEAkZHa8ehfUkuKbzmQNRTTAAs.jpg',
  '/zDJ4GVch7Iw2i0j84ceoElRUZUR.jpg',
];

storiesOf('Poster', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Poster
        size={ select('size', sizes, PosterSize.S) }
        path={ select('poster', paths, paths[0]) }
        title="This will be dynamic and will be used for accessibility"
      />
    );
  });
