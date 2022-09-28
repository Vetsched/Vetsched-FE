import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  currentTab: string = 'signup';
  services: any = [];
  signUpForm: FormGroup;
  emailVerificationCode: string = '';
  constructor(private fb: FormBuilder, private service: UserService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      profileType: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', Validators.required],
    });
    this.signUpForm.controls['confirmPassword'].addValidators(
      this.createCompareValidator(
        this.signUpForm.get('password'),
        this.signUpForm.get('confirmPassword')
      )
    );
  }

  ngOnInit(): void {
    this.loadServices();
  }
  loadServices(): void {
    this.service.getServices().subscribe(data => {
      this.services = data;
    });
  }
  signup(): void {
    if (this.signUpForm.invalid) {
      this.service.addToast('error', 'Please fill out all the fields!', '');
      return;
    }
    const btn: any = document.getElementById('signupBtn');
    btn.disabled = true;
    this.service
      .signup({
        ...this.signUpForm.value,
        profileType: parseInt(this.signUpForm.value.profileType),
      })
      .subscribe((response) => {
        if (response.token !== null) {
          this.currentTab = 'email';
          this.service.setToken(response.token);
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
  verifyEmail(): void {
    if (this.emailVerificationCode !== null && this.emailVerificationCode !== '') {
      return;
    }
    const btn: any = document.getElementById('verifyEmailBtn');
    btn.disabled = true;
    this.service
      .verifyEmail(this.emailVerificationCode)
      .subscribe((response) => {
        if (response.success === 200) {
          this.currentTab = 'service';
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
  createCompareValidator(controlOne: any, controlTwo: any) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }
}
