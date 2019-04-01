import styled from 'styled-components';

export const Container = styled.div`
  overflow: scroll;
  color: #FFF;
  background: ${(p: { backDrop: string }) => `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${ p.backDrop })`};
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center; 
  height: 100vh;
  width: 100vw;
`;

export const I = styled.i`
  font-size: 2rem;
  padding: 0.5em;
  color: #FFF;
`;

export const Main = styled.div`
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
`;

export const Details = styled.div`
  flex: 1;
  flex-basis: 300px;
  padding: .5em;
`;

export const Title = styled.div`
  margin: 10px;
  font-size: 2rem;
`;

export const TagLine = styled.div`
  margin: 10px;
  color: #CCC;
  font-size: 1.25rem;
`;

export const Overview = styled.div`
  margin: 10px;
  color: #CCC;
  font-size: 1rem;
`;