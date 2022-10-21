import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-pet-lovers',
  templateUrl: './pet-lovers.component.html',
  styleUrls: ['./pet-lovers.component.css'],
})
export class PetLoversComponent implements OnInit {
  serviceProviders: any = [];
  currentUser: any = {};
  constructor(private service: UserService) { }
  ngOnInit(): void {
    this.service.currentUser.subscribe(x => {
      this.currentUser = x;
      if (x.token !== null) {
        this.getServiceProviders();
      }
    })
  }
  getServiceProviders(): void {
    this.service.getConnectedServiceProviders(this.currentUser.profileId).subscribe((x:any) => {
      this.serviceProviders = x.data;
    });
  }
}
