import { Injectable } from '@angular/core';
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

  public GetSnaps = (username: string): Observable<Snap[]> => this.http.get(`${this.endpoint}/snaps/${username}`)
      .pipe(map(data => _.map(data['snaps'], (s: Snap) => new Snap(s))));

  public SendSnap = (snap: Partial<Snap>): Observable<Snap> => this.http.post(`${this.endpoint}/snaps`, snap)
      .pipe(map(data => new Snap(data['snap'])));

  public ViewSnap = (snap: Snap, username: string): Observable<Snap> =>
      this.http.put(`${this.endpoint}/snaps/view`, { username, snapId: snap.snapId, creatorUsername: snap.username })
      .pipe(map(data => new Snap(data)));

}
