import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class SendSnapComponent implements OnInit, OnDestroy {

  @Input() public username: string;
  public isSetup: boolean;
  public snapImage: SafeStyle;
  public snapImageUrl: string;
  public snapSentSuccessfully = false;

  public constructor(
      private apiService: ApiService,
      private s3Service: S3Service,
      private sanitization: DomSanitizer
  ) {
  }

  public ngOnInit(): void {
    this.imageUploadListener();
    this.imageUploadProgressListener();

    this.username = localStorage.getItem('username');
    this.snapImage = this.sanitization.bypassSecurityTrustStyle(`url(${'./assets/images/upload-image.png' })`);
    this.snapSentSuccessfully = false;
  }

  public ngOnDestroy(): void {
    this.s3Service.reset();
  }

  public imageSelected = async (e: Event): Promise<void> => {
    this.snapSentSuccessfully = false;
    const event = e as HTMLInputEvent;
    console.log(event);
    const imageFile: File = event.target.files && event.target.files.length && event.target.files[0];
    if (!imageFile) return;
    this.s3Service.upload(imageFile);
  }

  public sendSnap = async (): Promise<void> => {
    const snap: Partial<Snap> = {
      imageUrl: this.snapImageUrl,
      username: this.username
    };

    if (!snap.imageUrl) return console.error('No image selected');
    if (!snap.username) return console.error('Username is missing');

    this.apiService.SendSnap(snap).subscribe((completedSnap: Snap) => {
      console.log(completedSnap);
      this.snapImage = this.sanitization.bypassSecurityTrustStyle(`url(${ './assets/images/upload-image.png' })`);
      this.snapImageUrl = '';
      this.snapSentSuccessfully = true;
    });
  }

  private imageUploadListener = (): void => {
    this.s3Service.uploadListener.subscribe(async (imageURL: string) => {
      console.log(imageURL);
      if (!imageURL) return;
      this.snapImage = this.sanitization.bypassSecurityTrustStyle(`url(${ imageURL || './assets/images/upload-image.png' })`);
      this.snapImageUrl = imageURL;
      this.s3Service.reset();
    });
  }

  private imageUploadProgressListener = (): Subscription => this.s3Service.progressListener.subscribe((res: Progress) => console.log(res));

}
