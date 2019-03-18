import React, { SFC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import Poster, { PosterSize } from '../poster';


interface Props extends LinkProps {
  path: string;
  title: string;
  size?: PosterSize;
}

const PosterLink: SFC<Props> = ({ path, size = PosterSize.S, title, ...rest }) => {
  if (!path) return null;

  return (
    <Link { ...rest }>
      <Poster title={ title } size={ size } path={ path } />
    </Link>
  );
}

export { PosterSize };
export default PosterLink;
