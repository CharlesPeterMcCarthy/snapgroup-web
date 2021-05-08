import { Component, OnInit } from '@angular/core';
import {Snap} from '../../interfaces/snap';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-view-snaps',
  templateUrl: './view-snaps.component.html',
  styleUrls: ['./view-snaps.component.less']
})
export class ViewSnapsComponent implements OnInit {

  public snaps: Snap[];
  public username: string;

  public constructor(
      private apiService: ApiService
  ) {
    this.retrieveSnaps();
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  public retrieveSnaps = (): void => {
    this.apiService.GetSnaps().subscribe((snaps: Snap[]) => {
      console.log(snaps);
      this.snaps = snaps;
    });
  }

  public viewSnap = (snap: Snap): void => {
    this.apiService.ViewSnap(snap, this.username).subscribe((snaps: Snap) => {
      console.log(snaps);
    });
  }

}
