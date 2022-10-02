import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  pets: any = [];
  currentUser: any = {};
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
      }
    });
    this.getPets();
  }
  getPets(): void {
    this.service.getPets(this.currentUser.id).subscribe((x: any) => {
      this.pets = x;
    });
  }
}
