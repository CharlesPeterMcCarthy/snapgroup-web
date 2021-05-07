import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Snap} from '../../interfaces/snap';
import {ApiService} from '../../services/api.service';
import {S3Service} from '../../services/s3-service.service';
import {Subscription} from 'rxjs';
import {Progress} from 'aws-sdk/lib/request';
import HTMLInputEvent from '../../app.component';

@Component({
  selector: 'app-send-snap',
  templateUrl: './send-snap.component.html',
  styleUrls: ['./send-snap.component.less']
})
export class SendSnapComponent implements OnInit {

  public username: string;
  public isSetup: boolean;
  public snapImage: SafeStyle;
  public snaps: Snap[];

  public constructor(
      private apiService: ApiService,
      private s3Service: S3Service,
      private sanitization: DomSanitizer
  ) {
    this.username = localStorage.getItem('username');

    this.updateSetupState();

    if (this.isSetup) {
      this.retrieveSnaps();
    }
  }

  public ngOnInit(): void {
    this.imageUploadListener();
    this.imageUploadProgressListener();
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

  private imageUploadListener = (): void => {
    this.s3Service.uploadListener.subscribe(async (imageURL: string) => {
      console.log(imageURL);
      if (!imageURL) return;
      this.snapImage = this.sanitization.bypassSecurityTrustStyle(`url(${ imageURL || './assets/images/noavatar.jpg' })`);

      // this._spinner.hide('spinner');
      this.s3Service.reset();
    });
  }

  private imageUploadProgressListener = (): Subscription => this.s3Service.progressListener.subscribe((res: Progress) => console.log(res));

}
