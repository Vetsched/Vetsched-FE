import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:any = {
    profileType : 1
  };
  constructor(private service : UserService) { }

  ngOnInit(): void {
    // this.service.currentUser.subscribe((x) => {
    //   if (x.token !== null) {
    //     this.currentUser = x;
    //   }
    // });
  }

}
