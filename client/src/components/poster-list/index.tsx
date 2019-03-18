import React, { SFC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 5px 0;
  display: flex;
  flex-wrap: no-wrap;
  max-width: 100%;
  overflow-x: scroll;
  > * {
    margin: 0 25px;
  }
`;

interface Props {}

const PosterList: SFC<Props> = (props) => {
  return (
    <Container>
      { props.children }
    </Container>
  );
}

export default PosterList;
