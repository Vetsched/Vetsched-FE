import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  currentUser: any = {};
  constructor(private service: UserService) {
    this.service.populate();
  }
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
        CometChat.login(this.currentUser.id, environment.AUTH_KEY).then(
          (user) => {
            console.log('Login Successful:', { user });
          },
          (error) => {
            console.log('Login failed with exception:', { error });
          }
        );
      }
    });
  }
}
