import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css'],
})
export class SendRequestComponent implements OnInit, OnChanges {
  pets: any = [];
  currentUser: any = {};
  @Input() provider: any = {};
  constructor(private service: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x.token !== null) {
        this.getPets();
      }
    });
  }
  getPets(): void {
    this.service.getPets(this.currentUser.profileId).subscribe((x: any) => {
      this.pets = x;
    });
  }
  sendRequest(pet: any): void {
    this.service
      .sendRequest({
        senderId: this.currentUser.profileId,
        senderProfileType: this.currentUser.profileType,
        recieverId: this.provider.profileId,
        recieverProfileType: this.provider.profileType,
        petIds: [pet.id],
      })
      .subscribe((x: any) => {
        if (x.data) {
          this.service.addToast('success', 'Request sent successfully');
          $('#sendRequestModal').modal('hide');
        } else {
          this.service.addToast('error', x.statusMessage);
        }
      });
  }
}
