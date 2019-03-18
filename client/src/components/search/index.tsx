import React, { SFC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 50px;
  margin: 50px 0;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  font-size: 1.5rem;
  max-width: 80%;
  background-color: #131b20;
  color: #fff;
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
`;


const Search: SFC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <Container>
      <Input type="text" placeholder="Search" {...props} />
    </Container>
  );
}

export default Search;
