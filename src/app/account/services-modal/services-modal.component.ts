import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.css'],
})
export class ServicesModalComponent implements OnInit {
  services: any = [];
  providerServices: any = [];
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.loadServices();
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
        this.getProviderServices();
      }
    });
  }
  getProviderServices(): void {
    this.service.getProviderServices(this.currentUser.profileId).subscribe((x) => {
      this.providerServices = x.map((s: any) => s.id);
    });
  }

  loadServices(): void {
    this.service.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  saveProviderServices(): void {
    if (this.providerServices && this.providerServices.length > 0) {
      const btn: any = document.getElementById('providerServices');
      btn.disabled = true;
      this.service
        .saveProviderServices(this.providerServices, this.currentUser.profileId)
        .subscribe((response) => {
          if (response === true) {
            // this.currentTab = 'payment';
            this.service.addToast(
              'success',
              'Provider Services saved successfully',
              ''
            );
          } else {
            btn.disabled = false;
            this.service.addToast(
              'error',
              response.statusMessage ||
                'Something went wrong, please try again',
              ''
            );
          }
        });
    } else {
      return;
    }
  }
}
