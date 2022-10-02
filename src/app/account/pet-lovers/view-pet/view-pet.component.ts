import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css'],
})
export class ViewPetComponent implements OnInit {
  @Input() pet: any = {};
  constructor() {}

  ngOnInit(): void {}
}
