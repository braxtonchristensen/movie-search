import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { BASE_URL, API_KEY } from '../../constants';


export default class MovieApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }
  
  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', API_KEY);
  }
  
  async getPersonDetails(id: number) {
    return this.get(`person/${id}`)
  }
  
  async getPersonCredits(id: number) {
    return this.get(`person/${id}/combined_credits`)
  }
}