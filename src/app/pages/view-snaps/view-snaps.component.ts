import { Component, OnInit } from '@angular/core';
import {Snap} from '../../interfaces/snap';
import {ApiService} from '../../services/api.service';
import {SnapSqsQueueService} from '../../services/snap-sqs-queue.service';

@Component({
  selector: 'app-view-snaps',
  templateUrl: './view-snaps.component.html',
  styleUrls: ['./view-snaps.component.less']
})
export class ViewSnapsComponent implements OnInit {

  public snaps: Snap[];
  public username: string;

  public constructor(
      private apiService: ApiService,
      private snapSqsQueueService: SnapSqsQueueService
  ) {
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.retrieveSnaps();
  }

  public retrieveSnaps = (): void => {
    this.apiService.GetSnaps(this.username).subscribe((snaps: Snap[]) => {
      console.log(snaps);
      this.snaps = snaps;
    });
  }

  public viewSnap = (snap: Snap): void => {
    snap['show'] = true;

    setTimeout(() => {
      snap['show'] = false;
    }, 2000);

    this.apiService.ViewSnap(snap, this.username).subscribe((snaps: Snap) => {
      console.log(snaps);
    });
  }

}
