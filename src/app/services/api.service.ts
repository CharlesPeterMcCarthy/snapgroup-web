import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Snap } from '../interfaces/snap';
import _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public config: object = environment.awsConfig.API.endpoints[0];
  public name: string = environment.awsConfig.API.endpoints[0].name;
  public endpoint: string = environment.awsConfig.API.endpoints[0].endpoint;

  public constructor(
      private http: HttpClient
  ) { }

  public GetSnaps = (): Observable<Snap[]> => this.http.get(`${this.endpoint}/snaps`)
      .pipe(map(data => _.map(data['snaps'], (s: Snap) => new Snap(s))));

  // private handleError = (error: any): void => {
  //   if (!error.response || !error.response.data || !error.response.data.error) {
  //     throw { message: 'Unknown Error' };
  //   }
  //   throw error.response.data.error.description || error.response.data.error.message;
  // }

}
