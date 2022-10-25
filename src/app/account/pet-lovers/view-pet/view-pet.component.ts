import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css'],
})
export class ViewPetComponent implements OnInit, OnChanges {
  @Input() pet: any = {};
  comments: any = [];
  constructor(private service: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.getComments();
  }
  getComments(): void {
    this.service
      .getComment(this.pet.id, '')
      .subscribe((x) => (this.comments = x));
  }
}
