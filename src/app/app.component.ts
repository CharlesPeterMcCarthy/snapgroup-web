import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public title = 'SnapGroup';
  public username: string;
  public isSetup: boolean;

  public constructor() {
    this.username = localStorage.getItem('username');

    this.updateSetupState();
  }

  public setUsername = (username: string): void => {
    console.log(username);
    this.username = username;
    localStorage.setItem('username', this.username);

    this.updateSetupState();
  }

  private updateSetupState = (): void => {
    this.isSetup = !!this.username;
  }

  public logout = (): void => {
    localStorage.removeItem('username');
    this.username = undefined;
    this.updateSetupState();
  }

}
