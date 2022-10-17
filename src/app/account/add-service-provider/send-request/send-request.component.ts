import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {
  pets: any = [];
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x.token !== null) {
        this.getPets();
      }
    });
  }
  getPets(): void {
    this.service.getPets(this.currentUser.id).subscribe((x: any) => {
      this.pets = x.data;
    });
  }
}
