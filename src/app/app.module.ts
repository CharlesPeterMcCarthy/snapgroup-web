import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {AmplifyAngularModule, AmplifyModules, AmplifyService} from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import {HttpClientModule} from '@angular/common/http';
import { ViewSnapsComponent } from './pages/view-snaps/view-snaps.component';
import { SendSnapComponent } from './pages/send-snap/send-snap.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewSnapsComponent,
    SendSnapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: (): AmplifyAngularModule => {
        return AmplifyModules({
          Auth
        });
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
