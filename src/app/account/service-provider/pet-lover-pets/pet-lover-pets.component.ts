import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-pet-lover-pets',
  templateUrl: './pet-lover-pets.component.html',
  styleUrls: ['./pet-lover-pets.component.css'],
})
export class PetLoverPetsComponent implements OnInit {
  pets: any = [];
  PetLoverId: any = {};
  pet: any = {};
  constructor(private service: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.PetLoverId = paramMap.get('PetLoverId') || '';
      if (this.PetLoverId !== '') {
        this.getPets();
      }
    });
  }
  getPets(): void {
    this.service.getPets(this.PetLoverId).subscribe((x: any) => {
      this.pets = x;
    });
  }
  viewPet(pet: any): void {
    this.pet = pet;
    $('#viewPet').modal('show');
  }
}
