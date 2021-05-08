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

  public snaps: Snap[] = [];
  public username: string;
  public timeLeft = 0;

  public constructor(
      private apiService: ApiService,
      private snapSqsQueueService: SnapSqsQueueService
  ) {
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.retrieveSnaps();
    this.snapReceivedListener();
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
      this.apiService.ViewSnap(snap, this.username).subscribe((snaps: Snap) => {
        console.log(snaps);
      });
    }, 10000);

    this.timeLeft = 10000;
    const timer = setInterval(() => {
      this.timeLeft = this.timeLeft - 1000;
      if (this.timeLeft <= 0) clearInterval(timer);
    }, 1000);
  }

  private snapReceivedListener = (): void => {
    this.snapSqsQueueService.snapListener.subscribe(async (snap: Snap) => {
      console.log(snap);
      if (!snap) return;
      const existingSnapIndex: number = this.snaps.findIndex((s: Snap) => s.snapId === snap.snapId);
      if (existingSnapIndex > -1) {
        this.snaps[existingSnapIndex] = snap;
      } else {
        this.snaps.unshift(snap);
      }
    });
  }

}
