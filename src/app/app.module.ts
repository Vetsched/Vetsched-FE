import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
