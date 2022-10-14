import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  currentUser: any = {};
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
      }
    });
  }
  logout(): void {
    this.closeLogout();
    this.service.purgeAuth();
  }
  closeLogout(): void {
    $('#confirmLogout').modal('hide');
  }
  confirmLogout(): void {
    $('#confirmLogout').modal('show');
  }
  showProfile(): void {
    $('#userProfile').modal('show');
  }
  showServices(): void {
    $('#servicesModal').modal('show');
  }
}
