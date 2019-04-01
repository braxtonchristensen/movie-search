export interface ActorDetailsResponse {
  birthday:             string;
  known_for_department: string;
  deathday:             null | string;
  id:                   number;
  name:                 string;
  also_known_as:        string[];
  gender:               number;
  biography:            string;
  popularity:           number;
  place_of_birth:       string;
  profile_path:         string;
  adult:                boolean;
  imdb_id:              string;
  homepage:             null;
}

export interface ActorCreditsResponse {
  cast: Cast[];
  crew: Crew[];
  id:   number;
}

export interface Cast {
  id:                number;
  character:         string;
  original_title?:   string;
  overview:          string;
  vote_count:        number;
  video?:            boolean;
  media_type:        MediaType;
  release_date?:     string;
  vote_average:      number;
  title?:            string;
  popularity:        number;
  original_language: OriginalLanguage;
  genre_ids:         number[];
  backdrop_path:     null | string;
  adult?:            boolean;
  poster_path:       null | string;
  credit_id:         string;
  episode_count?:    number;
  origin_country?:   OriginCountry[];
  original_name?:    string;
  name?:             string;
  first_air_date?:   string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginCountry {
  De = "DE",
  Fr = "FR",
  GB = "GB",
  Ru = "RU",
  Us = "US",
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Fr = "fr",
}

export interface Crew {
  id:                number;
  department:        string;
  original_language: OriginalLanguage;
  original_title:    string;
  job:               string;
  overview:          string;
  vote_count:        number;
  video:             boolean;
  media_type:        MediaType;
  release_date:      string;
  vote_average:      number;
  title:             string;
  popularity:        number;
  genre_ids:         number[];
  backdrop_path:     string;
  adult:             boolean;
  poster_path:       string;
  credit_id:         string;
}
