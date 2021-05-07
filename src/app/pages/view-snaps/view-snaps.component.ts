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

  public constructor(
      private apiService: ApiService
  ) {
    this.retrieveSnaps();
  }

  public ngOnInit(): void {
  }

  public retrieveSnaps = (): void => {
    this.apiService.GetSnaps().subscribe((snaps: Snap[]) => {
      console.log(snaps);
      this.snaps = snaps;
    });
  }

}
