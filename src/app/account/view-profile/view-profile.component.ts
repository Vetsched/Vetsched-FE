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
    this.service
      .updateProfile({ ...this.profileForm.value, id: this.currentUser.id })
      .subscribe((x: any) => {
        if (x) {
          $('#userProfile').modal('hide');
          this.service.addToast('success', 'Profile updated successfully');
        } else {
          this.service.addToast('error', 'Some thing went wrong!');
        }
      });
  }
  upload(): void {
    $('#uploadFile').click();
  }
  uploadFile(event: any): void {
    const files = event.target.files;
    const fd: FormData = new FormData();
    fd.append('ProfileId', this.currentUser.profileId);
    fd.append('Picture', files[0], files[0].name);
    this.service.uploadPicture(fd).subscribe((x: any) => {
      console.log(x);
    });
  }
}
