import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {
  petLovers:any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
