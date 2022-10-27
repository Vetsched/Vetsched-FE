import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
@NgModule({
  declarations: [
    AppComponent,
    EmailVerificationComponent
  ],
  imports: [
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
export class AppModule {}
