import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-lover',
  templateUrl: './pet-lovers.component.html',
  styleUrls: ['./pet-lovers.component.css']
})
export class PetLoversComponent implements OnInit {
  serviceProviders:any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
