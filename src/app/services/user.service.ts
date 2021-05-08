import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public username: string;

  public constructor() { }

  public setUsername = (username: string): string => this.username = username;

}
