import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Details = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1.5em;
  color: #FFF;
  text-align: left:
`;

export const Title = styled.div`
  font-size: 1.5rem;
`;

export const Overview = styled.div`
  font-size: 1.25rem;
  color: #CCC;
`;

export const PageNav = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 513px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #FFF;
  > i {
    font-size: 5rem;
  }
`;