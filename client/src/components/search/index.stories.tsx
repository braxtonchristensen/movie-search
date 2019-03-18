import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Search from '.';

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Search />
    );
  });
