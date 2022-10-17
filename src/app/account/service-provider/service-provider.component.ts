import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {
  petLovers:any = [];
  currentUser: any = {};
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.currentUser.subscribe(x => {
      this.currentUser = x;
      if (x.token !== null) {
        this.getConnectedPetLovers();
      }
    })
  }
  getConnectedPetLovers(): void {
    this.service.getConnectedPetLovers(this.currentUser.id).subscribe((x:any) => {
      if (x.statusCode == 200) {
        this.petLovers = x.data;
      }
    });
  }
}
