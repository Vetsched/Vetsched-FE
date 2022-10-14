import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit {
  currentUser: any = {};
  constructor(private service: UserService) {}
  
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
      }
    });
  }
}
