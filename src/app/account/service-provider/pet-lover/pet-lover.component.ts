import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-pet-lover',
  templateUrl: './pet-lover.component.html',
  styleUrls: ['./pet-lover.component.css'],
})
export class PetLoverComponent implements OnInit {
  @Input() petLover: any = {};
  @Input() index: number | undefined;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  currentUser: any = {};
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }

  delete(): void {
    this.service
      .removeFriend({
        senderId: this.currentUser.profileId,
        senderProfileType: this.currentUser.profileType,
        recieverId: this.petLover.profileId,
        recieverProfileType: this.petLover.profileType,
      })
      .subscribe((x: any) => {
        if (x.data) {
          this.service.addToast('success', 'Deleted Successfully');
          this.refresh.emit(true);
        } else {
          this.service.addToast('error', x.statusMessage);
        }
      });
  }
}
