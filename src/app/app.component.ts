import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public title = 'SnapGroup';
  public isSetup: boolean;
  public deviceId: string;
  public username: string;

  public constructor() {
    this.deviceId = localStorage.getItem('deviceId');
    this.username = localStorage.getItem('username');
    this.isSetup = !!(this.deviceId && !this.username);
    console.log(2, this.deviceId);

    if (!this.isSetup) {
      this.setDeviceId();
    }
  }

  private setDeviceId = (): void => {
    this.deviceId = this.deviceId || uuid();
    localStorage.setItem('deviceId', this.deviceId);
  }

}
