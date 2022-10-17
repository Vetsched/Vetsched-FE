import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit {
  currentUser: any = {};
  form: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: [0, Validators.required],
      breed: ['', Validators.required],
      sepcies: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      microchiped: ['', Validators.required],
      vaccination: [''],
      allergies: [''],
      medications: [''],
      vaccineRecieved: [''],
      dueVaccine: [''],
      lastVistDescription: [''],
      previousMedical: [''],
      details: [''],
    });
  }

  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
      }
    });
  }
  save(): void {
    if (this.form.invalid) {
      this.service.addToast('error', 'Please fill out all the fields!', '');
      return;
    }
    const btn: any = document.getElementById('petSaveBtn');
    btn.disabled = true;
    this.service
      .addPet({
        ...this.form.value,
        sex: Number(this.form.value.sex),
        microchiped: this.form.value.microchiped === 'true' ? true : false,
        vaccination: this.form.value.vaccination === 'true' ? true : false,
      })
      .subscribe((response: any) => {
        if (response.data) {
          this.service.addToast(
            'success',
            response.statusMessage || 'Something went wrong, please try again',
            ''
          );
        } else {
          btn.disabled = false;
          this.service.addToast(
            'error',
            response.statusMessage || 'Something went wrong, please try again',
            ''
          );
        }
      });
  }
}
