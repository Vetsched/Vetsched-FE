import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-pet-lover',
  templateUrl: './pet-lovers.component.html',
  styleUrls: ['./pet-lovers.component.css'],
})
export class PetLoversComponent implements OnInit {
  serviceProviders: any = [];
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getServiceProviders();
  }
  getServiceProviders(): void {
    // this.service.getServiceProviders().subscribe(x => {
    // });
  }
}
