export interface MovieResponse {
  movies: Movies;
}

export interface Movies {
  page:        number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  movies:      Movie[];
  __typename:  string;
}

export interface Movie {
  id:          number;
  title:       string;
  poster_path: string;
  overview:    string;
  __typename:  Typename;
}

export enum Typename {
  Movie = "Movie",
  MovieDetails = "MovieDetails",
  Credit = "Credit",
  PersonCredit = "PersonCredit",
}

export interface MovieVariables {
  search: string | undefined;
  page:   number;
}

export interface MovieDetailsResponse {
  movie: MovieDetails;
}

export interface MovieDetails {
  title:         string;
  tagline:       string;
  overview:      string;
  poster_path:   string;
  backdrop_path: string;
  release_date:  string;
  cast:          Cast[];
  __typename:    Typename;
}

export interface Cast {
  name:         string;
  id:           number;
  profile_path: null | string;
  __typename:   Typename;
}

export interface MovieDetailsVariable {
  id: number;
}

export interface ActorDetailsResponse {
  person: Person;
}

export interface Person {
  name:         string;
  id:           number;
  biography:    string;
  profile_path: string;
  cast:         CastIn[];
  __typename:   string;
}

export interface CastIn {
  title:       string;
  id:          number;
  poster_path: null | string;
  __typename:  Typename;
}

export interface ActorDetailsVariable {
  id: number;
}
