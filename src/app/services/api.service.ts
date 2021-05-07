import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public config: object = environment.awsConfig.API.endpoints[0];
  public name: string = environment.awsConfig.API.endpoints[0].name;

  public constructor() { }

  public GetSnaps = (): Promise<any> => API.get(this.name, '/snaps', '').catch(this.handleError);

  private handleError = (error: any): void => {
    if (!error.response || !error.response.data || !error.response.data.error) {
      throw { message: 'Unknown Error' };
    }
    throw error.response.data.error.description || error.response.data.error.message;
  }
}
