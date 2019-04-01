export interface MovieDetailsResponse {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: BelongsToCollection;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          string;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}

export interface BelongsToCollection {
  id:            number;
  name:          string;
  poster_path:   string;
  backdrop_path: string;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name:      string;
}

export interface MovieCreditsResponse {
  id:   number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  cast_id:      number;
  character:    string;
  credit_id:    string;
  gender:       number;
  id:           number;
  name:         string;
  order:        number;
  profile_path: null | string;
}

export interface Crew {
  credit_id:    string;
  department:   string;
  gender:       number;
  id:           number;
  job:          string;
  name:         string;
  profile_path: null | string;
}
