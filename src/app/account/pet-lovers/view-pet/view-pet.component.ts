import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css'],
})
export class ViewPetComponent implements OnInit, OnChanges {
  @Input() pet: any = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {}
}
