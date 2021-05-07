import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewSnapsComponent} from './pages/view-snaps/view-snaps.component';
import {SendSnapComponent} from './pages/send-snap/send-snap.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view', component: ViewSnapsComponent },
  { path: 'send', component: SendSnapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
