import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  currentTab: string = 'signup';
  services:any = [];
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }
  loadServices(): void {

  }
  signup(): void {
    this.currentTab = 'email';
  }
  verifyEmail(): void {
    this.currentTab = 'service';
  }
}
