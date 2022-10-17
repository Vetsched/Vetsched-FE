import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @Input() request: any = {};
  @Input() index: number | undefined;
  currentUser: any = {};
  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }
  approve(): void {
    this.service
      .approveRequest({
        senderId: this.currentUser.profileId,
        senderProfileType: this.currentUser.profileType,
        recieverId: this.request.profileId,
        recieverProfileType: this.request.profileType,
        status: 0,
      })
      .subscribe((x: any) => {
        if (x.data) {
          this.service.addToast('success', x.statusMessage);
          this.router.navigate(['/account']);
        } else {
          this.service.addToast('error', x.statusMessage);
        }
      });
  }
  reject(): void {
    this.service
      .rejectRequest({
        senderId: this.currentUser.profileId,
        senderProfileType: this.currentUser.profileType,
        recieverId: this.request.profileId,
        recieverProfileType: this.request.profileType,
        status: 0,
      })
      .subscribe((x: any) => {
        if (x.data) {
          this.service.addToast('success', x.statusMessage);
          this.router.navigate(['/account']);
        } else {
          this.service.addToast('error', x.statusMessage);
        }
      });
  }
}
