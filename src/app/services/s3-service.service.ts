import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Progress } from 'aws-sdk/lib/request';
import SendData = S3.ManagedUpload.SendData;

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  public uploadListener: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public progressListener: BehaviorSubject<Progress> = new BehaviorSubject<Progress>(null);

  public constructor() {
    this.reset();
  }

  public upload = (file: File): void => {
    const bucket = new S3(environment.s3Bucket.access);

    const params = {
      Bucket: environment.s3Bucket.name,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    bucket.upload(params).on('httpUploadProgress', (evt: Progress) =>
        this.progressListener.next(evt)
    ).send((err: Error, data: SendData) => {
      if (err) console.log('There was an error uploading your file: ', err);
      else this.uploadListener.next(data.Location);
    });
  }

  public reset = (): void => {
    this.uploadListener = new BehaviorSubject<string>(null);
    this.progressListener = new BehaviorSubject<Progress>(null);
  }

}
