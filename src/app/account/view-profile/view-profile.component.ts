import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  currentUser: any = {};
  profileForm: FormGroup;
  constructor(private service: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
        this.profileForm.patchValue({
          name: this.currentUser.name,
          address: this.currentUser.address,
          email: this.currentUser.email,
        });
      }
    });
  }
  save(): void {
    if (this.profileForm.invalid) {
      this.service.addToast('error', 'Please fill out all the fields!', '');
      return;
    }
    const btn: any = document.getElementById('saveProfileBtn');
    btn.disabled = true;
  }
}
