import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  @Input() pet: any = {};
  @Input() showSelect: boolean = false;
  @Input() index: number | undefined;
  @Output() viewPet = new EventEmitter();
  @Output() selected = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  view(): void {
    this.viewPet.emit(true);
  }
  select(): void {
    this.selected.emit(true);
  }
}
