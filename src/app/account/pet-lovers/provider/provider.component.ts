import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent implements OnInit, OnChanges {
  @Input() serviceProvider: any = {};
  @Input() index: number | undefined;
  @Input() sendRequest: boolean = false;
  @Output() request: EventEmitter<any> = new EventEmitter();
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }
  sendRequestToProvider(): void {
    this.request.emit(this.serviceProvider);
  }
  delete(): void {
    this.service
      .removeFriend({
        senderId: this.currentUser.profileId,
        senderProfileType: this.currentUser.profileType,
        recieverId: this.serviceProvider.profileId,
        recieverProfileType: this.serviceProvider.profileType,
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
