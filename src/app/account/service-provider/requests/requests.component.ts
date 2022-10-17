import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests :any = [];
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
        this.loadRequests();
      }
    });
  }
  loadRequests(): void {
    this.service.getRequestsFromPetLovers(this.currentUser.profileId).subscribe(x => {
      this.requests = x;
    });
  }
}
