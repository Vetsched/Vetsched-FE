import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/core';

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
  @Output() refresh = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor(private service: UserService) {}

  ngOnInit(): void {}
  view(): void {
    this.viewPet.emit(true);
  }
  select(): void {
    this.selected.emit(true);
  }
  removePet(): void {
    this.service.removePet(this.pet.id).subscribe((x) => {
      if (x) {
        this.service.addToast('success', 'Pet deleted successfully');
        this.refresh.emit(true);
      } else {
        this.service.addToast(
          'error',
          'Something went wrong, please try again'
        );
      }
    });
  }
  editPet(): void {
    this.edit.emit(true);
  }
}
