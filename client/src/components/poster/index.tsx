import React, { SFC } from 'react';

export enum PosterSize {
  S = 'w185',
  M = 'w342',
  L = 'w500',
  XL = 'w780',
  XXL = 'original',
}

interface Props {
  path: string;
  title: string;
  size?: PosterSize;
}

const Poster: SFC<Props> = ({ title, size, path }) => {
  return (
    <img alt={ title } src={ `https://image.tmdb.org/t/p/${size}${path}` } />
  );
}

export default Poster;
