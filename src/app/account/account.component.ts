import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.populate();
  }
}
