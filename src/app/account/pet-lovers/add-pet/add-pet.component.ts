import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit, OnChanges {
  currentUser: any = {};
  form: FormGroup;
  @Input() pet: any = {};
  @Output() success = new EventEmitter();
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
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  ngOnInit(): void {
    if (this.pet !== null) {
      this.form.patchValue({
        name: this.pet.name,
        title: this.pet.title,
        breed: this.pet.breed,
        sepcies: this.pet.sepcies,
        age: this.pet.age,
        sex: this.pet.sex,
        microchiped: this.pet.microchiped,
        vaccination: this.pet.vaccination,
        allergies:
          this.pet.allergies &&
          this.pet.allergies.list &&
          this.pet.allergies.list[0],
        medications:
          this.pet.medications &&
          this.pet.medications.list &&
          this.pet.medications.list[0],
        vaccineRecieved: this.pet.vaccineRecieved,
        dueVaccine: this.pet.dueVaccine,
        lastVistDescription: this.pet.lastVistDescription,
        previousMedical: this.pet.previousMedical,
        details: this.pet.details && this.pet.details.obj,
      });
    }
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
    const obj = {
      name: this.form.value.name,
      title: this.form.value.title,
      breed: this.form.value.breed,
      sepcies: this.form.value.sepcies,
      age: this.form.value.age,
      sex: Number(this.form.value.sex),
      microchiped: this.form.value.microchiped === 'true' ? true : false,
      vaccination: this.form.value.vaccination === 'true' ? true : false,
      vaccineRecieved: this.form.value.vaccineRecieved,
      dueVaccine: this.form.value.dueVaccine,
      lastVistDescription: this.form.value.lastVistDescription,
      previousMedical: this.form.value.previousMedical,
      profileId: this.currentUser.profileId,
      allergies: { list: [this.form.value.allergies] },
      medications: { list: [this.form.value.medications] },
      details: { obj: this.form.value.details },
    };
    this.service
      .addPet(obj, (this.pet && this.pet.id) || '')
      .subscribe((response: any) => {
        if (response) {
          this.service.addToast(
            'success',
            response.statusMessage ||
              (this.pet && this.pet.id
                ? 'Pet Updated Successfully!'
                : 'Pet Added Successfully!'),
            ''
          );
          this.success.emit(true);
          $('#addPet').modal('hide');
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
