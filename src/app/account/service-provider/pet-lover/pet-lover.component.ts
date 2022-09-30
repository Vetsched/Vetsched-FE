import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-lover',
  templateUrl: './pet-lover.component.html',
  styleUrls: ['./pet-lover.component.css']
})
export class PetLoverComponent implements OnInit {
  @Input() petLover:any = {};
  @Input() index:number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
