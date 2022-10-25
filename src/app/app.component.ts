import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';
import { UserService } from './core';

@Component({
  selector: '.root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'vetsched';
  constructor(private userService: UserService) {
    this.userService.populate();
  }
  ngOnInit() {
    const appID = environment.APP_ID;
    const region = environment.REGION;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      }
    );
  }
}
