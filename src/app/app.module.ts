import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routing } from './app.routing';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';

//services
import { MessageHandlingService } from './services/message-handling/message-handling.service';
import { SessionCheckService } from './services/session-check/session-check.service';
import { AuthenticationHandlingService } from './services/authentication-handling/authentication-handling.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MessageHandlingService,
    SessionCheckService,
    AuthenticationHandlingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
