import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  currentUser: any = {};
  providerServices: any = [];
  noOfPets: number = 0;
  constructor(private fb: FormBuilder, private service: UserService, private router: Router) {
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
    this.service.currentUser.subscribe((x) => {
      if (x.token !== null) {
        this.currentUser = x;
      }
    });
  }
  loadServices(): void {
    this.service.getServices().subscribe((data) => {
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
    const user = {
      ...this.signUpForm.value,
      profileType: parseInt(this.signUpForm.value.profileType),
    };
    this.service.signup({ ...user }).subscribe((response) => {
      if (response.token !== null) {
        this.currentTab = 'service'; // email
        this.service.setAuth({ ...response.data, token: response.token });
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
    this.currentTab = 'service';
    return;
    if (
      this.emailVerificationCode !== null &&
      this.emailVerificationCode !== ''
    ) {
      const btn: any = document.getElementById('verifyEmailBtn');
      btn.disabled = true;
      this.service
        .verifyEmail(this.emailVerificationCode)
        .subscribe((response) => {
          if (response.success === 200) {
            this.currentTab = 'service';
            this.service.addToast('success', 'Email verified successfully', '');
          } else {
            btn.disabled = false;
            this.service.addToast(
              'error',
              response.statusMessage ||
                'Something went wrong, please try again',
              ''
            );
          }
        });
    } else {
      return;
    }
  }
  saveNoOfPets(): void {
    if (this.noOfPets > 0) {
      const btn: any = document.getElementById('noOfPets');
      btn.disabled = true;
      this.service.saveNoOfPets(this.noOfPets, this.currentUser.profileId).subscribe((response) => {
        if (response === true) {
          // this.currentTab = 'payment';
          this.service.addToast('success', 'No of pets saved successfully', '');
          this.router.navigateByUrl('/account');
        } else {
          btn.disabled = false;
          this.service.addToast(
            'error',
            response.statusMessage || 'Something went wrong, please try again',
            ''
          );
        }
      });
    } else {
      return;
    }
  }
  saveProviderServices(): void {
    if (this.providerServices && this.providerServices.length > 0) {
      const btn: any = document.getElementById('providerServices');
      btn.disabled = true;
      this.service
        .saveProviderServices(this.providerServices, this.currentUser.profileId)
        .subscribe((response) => {
          if (response === true) {
            // this.currentTab = 'payment';
            this.service.addToast(
              'success',
              'Provider Services saved successfully',
              ''
            );
            this.router.navigateByUrl('/account');
          } else {
            btn.disabled = false;
            this.service.addToast(
              'error',
              response.statusMessage ||
                'Something went wrong, please try again',
              ''
            );
          }
        });
    } else {
      return;
    }
  }
  createCompareValidator(controlOne: any, controlTwo: any) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }
}
