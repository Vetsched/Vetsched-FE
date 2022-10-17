import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-add-service-provider',
  templateUrl: './add-service-provider.component.html',
  styleUrls: ['./add-service-provider.component.css'],
})
export class AddServiceProviderComponent implements OnInit {
  serviceProviders: any = [];
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x.token !== null) {
        this.getServiceProviders();
      }
    });
  }
  getServiceProviders(): void {
    this.service.getServiceProviders().subscribe((x: any) => {
      this.serviceProviders = x.data;
    });
  }
  sendRequestToProvider(provider: any): void {
    $('#sendRequestModal').modal('show');
  }
}
