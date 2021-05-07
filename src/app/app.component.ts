import { Component } from '@angular/core';
import {ApiService} from './services/api.service';
import {HttpClient} from '@angular/common/http';
import {Snap} from './interfaces/snap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public title = 'SnapGroup';
  public username: string;
  public isSetup: boolean;

  public constructor(
      private apiService: ApiService
  ) {
    this.username = localStorage.getItem('username');

    this.updateSetupState();

    // if (this.isSetup) {
    //   this.retrieveSnaps();
    // }
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

  public retrieveSnaps = async (): Promise<void> => {
    console.log(1);
    // const res: any = await this.apiService.GetSnaps();
    // const res: any = await this.apiService.GetSnaps2();
    const res: any = await this.apiService.GetSnaps2().subscribe((res2: Snap[]) => {
      console.log(res2);
    });
    console.log(2);
    console.log(res);
  }

}
