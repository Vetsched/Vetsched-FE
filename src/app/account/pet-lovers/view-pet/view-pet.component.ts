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
  currentUser: any = {};
  comment: string = '';
  constructor(private service: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
    this.getComments();
  }
  getComments(): void {
    this.service
      .getComment(this.pet.id, this.currentUser.profileId)
      .subscribe((x) => (this.comments = x));
  }
  addComment(): void {
    if (this.comment !== '') {
      this.service
        .addComment({
          PetId: this.pet.id,
          ServiceProviderId: this.currentUser.profileId,
          Comment: this.comment,
        })
        .subscribe((x) => {
          if (x) {
            this.comment = '';
            this.service.addToast('success', 'Comment added successfully');
          } else {
            this.service.addToast(
              'error',
              'Something went wrong, please try again.'
            );
          }
        });
    }
  }
}
