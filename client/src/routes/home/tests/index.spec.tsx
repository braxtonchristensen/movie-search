import React, { SFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, waitForElement, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import Home, { query } from '../';
import { POPULAR_MOVIES_RES, POPULAR_MOVIES_RES_2, SEARCH_MOVIES_RES } from './data';
import { act } from 'react-test-renderer';

const mockedQuery = {
  request: {
    query,
    variables: { search: '', page: 1 },
  },
  result: {
    data: null
  }
}

const mockedError = {
  ...mockedQuery,
  result: {
    error: new Error('Something bad happened'),
  }
}

const fulfilledQuery = {
  ...mockedQuery,
  result: {
    data: { movies: POPULAR_MOVIES_RES },
    error: null,
  }
}

const fulfilledQuery2 = {
  request: {
    query,
    variables: { search: '', page: 2 },
  },
  result: {
    data: { movies: POPULAR_MOVIES_RES_2 },
    error: null,
  }
}

const fulfilledSearch = {
  request: {
    query,
    variables: { search: 'happy', page: 1 },
  },
  result: {
    data: { movies: SEARCH_MOVIES_RES },
    error: null,
  }
}

const Wrapper: SFC<any> = ({ mocks, ...props }) => (
  <MockedProvider mocks={ mocks } addTypename={false}>
    <Router>    
      { props.children }
    </Router>
  </MockedProvider>
)

describe('Home', () => {
  afterEach(cleanup)
  it('should render a loading indicator', async () => {
    const { debug, getByText } = render(
      <Wrapper mocks={ [] }>
        <Home />
      </Wrapper>
    );
    
    expect(getByText('Loading...')).toBeTruthy()
  })

  it('should render a error indicator if query had an issue', async () => {
    const { getByText } = render(
      <Wrapper mocks={ [ mockedError ] }>
        <Home />
      </Wrapper>
    );
    
    await wait(10);
    
    expect(getByText('Error :(')).toBeTruthy()
  })

  it('should render a movie poster for each movie in successful query', async () => {
    const { getAllByAltText } = render(
      <Wrapper mocks={ [ fulfilledQuery ] }>
        <Home />
      </Wrapper>
    );
    
    const posters = await waitForElement(() =>
      getAllByAltText(/Some Title/),
    )
    
    expect(posters).toHaveLength(fulfilledQuery.result.data.movies.movies.length)
  });

  it('should render movie details of focused item', async () => {
    const { getAllByAltText, queryByText } = render(
      <Wrapper mocks={ [ fulfilledQuery ] }>
        <Home />
      </Wrapper>
    );
    
    const posters = await waitForElement(() =>
      getAllByAltText(/Some Title/),
    )
    
    expect(queryByText('Some Title 1')).toBeTruthy();
    expect(queryByText('...about Some Movie 1')).toBeTruthy();
    expect(queryByText('Some Title 2')).toBeNull();
    expect(queryByText('...about Some Movie 2')).toBeNull();
    
    fireEvent.mouseOver(posters[1]);
    
    expect(queryByText('Some Title 2')).toBeTruthy();
    expect(queryByText('...about Some Movie 2')).toBeTruthy();
    expect(queryByText('Some Title 1')).toBeNull();
    expect(queryByText('...about Some Movie 1')).toBeNull();
  });

  it('should render previous and next page indicators', async () => {
    const { getByText } = render(
      <Wrapper mocks={ [ fulfilledQuery ] }>
        <Home />
      </Wrapper>
    );
    
    const nextPage = await waitForElement(() =>
      getByText('navigate_next'),
    )
    const prevPage = await waitForElement(() =>
      getByText('navigate_before'),
    )
    
    expect(nextPage).toBeTruthy();
    expect(prevPage).toBeTruthy();
  });

  it('should get fresh data after clicking next indicator', async () => {
    const { getByText, queryByAltText } = render(
      <Wrapper mocks={ [ fulfilledQuery, fulfilledQuery2 ] }>
        <Home />
      </Wrapper>
    );
    
    const nextPage = await waitForElement(() =>
      getByText('navigate_next'),
    )
    
    expect(queryByAltText('Some Title 8')).toBeNull();

    fireEvent.click(nextPage);
    await wait(0)

    expect(nextPage).toBeTruthy();
    expect(queryByAltText('Some Title 8')).toBeTruthy();
    expect(queryByAltText('Some Title 1')).toBeNull();
  });

  it('should get fresh data after search', async () => {
    const { queryByText, getByPlaceholderText } = render(
      <Wrapper mocks={ [ fulfilledQuery, fulfilledSearch ] }>
        <Home />
      </Wrapper>
    );
    
    const search = getByPlaceholderText('Search');
    expect(queryByText('Happy Title 1')).toBeNull();
    
    fireEvent.change(search, { target: { value: 'happy' } });
    
    await wait(550); // long wait here because of debounce
    
    expect(queryByText('Happy Title 1')).toBeTruthy();
  });
});