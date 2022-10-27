import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core';
import { CoreModule } from './core/core.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
