import { Component } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: '.root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vetsched';
  constructor(private userService : UserService) {
    this.userService.populate();
  }
}
