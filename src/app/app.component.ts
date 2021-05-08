import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

export default interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public title = 'SnapGroup';
  public loggedIn = false;
  public username: string;

  public constructor(
      private router: Router
  ) {
    this.username = localStorage.getItem('username');

    this.updateSetupState();
  }

  public setUsername = (username: string): void => {
    console.log(username);
    this.username = username;
    localStorage.setItem('username', this.username);

    this.updateSetupState();
  }

  public logout = async (): Promise<void> => {
    localStorage.removeItem('username');
    this.username = undefined;
    this.updateSetupState();
    await this.router.navigateByUrl('/');
  }

  private updateSetupState = (): void => {
    this.loggedIn = !!this.username;
  }

}
