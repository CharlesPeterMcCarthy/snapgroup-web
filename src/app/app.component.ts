import { Component } from '@angular/core';
import {ApiService} from './services/api.service';
import {Snap} from './interfaces/snap';
import {S3Service} from './services/s3-service.service';

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
  public username: string;
  public isSetup: boolean;
  public snaps: Snap[];

  public constructor(
      private apiService: ApiService,
      private s3Service: S3Service
  ) {
    this.username = localStorage.getItem('username');

    this.updateSetupState();

    if (this.isSetup) {
      this.retrieveSnaps();
    }
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

  public retrieveSnaps = (): void => {
    this.apiService.GetSnaps().subscribe((snaps: Snap[]) => {
      console.log(snaps);
      this.snaps = snaps;
    });
  }

  public imageSelected = async (e: Event): Promise<void> => {
    const event = e as HTMLInputEvent;
    console.log(event);
    const imageFile: File = event.target.files && event.target.files.length && event.target.files[0];
    if (!imageFile) return;
    this.s3Service.upload(imageFile);
  }

}
