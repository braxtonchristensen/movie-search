import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { BASE_URL, API_KEY } from '../../constants';


export default class MovieApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }
  
  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', API_KEY);
    request.params.set('include_adult', 'false');
    request.params.set('language', 'en-US');
  }
  
  async getMovieDetails(id: number) {
    return this.get(`movie/${id}`)
  }
  
  async getMovieCredits(id: number) {
    return this.get(`movie/${id}/credits`)
  }

  async getPopularMovies(page = 1) {
    return this.get(`movie/popular?page=${page}`);
  }
  
  async searchMovies(search: string, page = 1) {
    return this.get(`search/movie?query=${encodeURI(search)}&page=${page}`)
  }
}