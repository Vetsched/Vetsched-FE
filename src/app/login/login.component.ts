import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = { errors: {} };
  authType = 'login';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // 'password': ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+\\|:;',.\<>/?~])[A-Za-z\d!@#$%^&*-_=+\\|:;',.\<>/?~].{7,}$")]]
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.authForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.errors = { errors: {} };
    const credentials = { ...this.authForm.value };
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (response) => {
        if (response.data && response.data !== null) {
          this.router.navigateByUrl('/account');
        } else {
          this.isSubmitting = false;
          this.userService.addToast('error', response.statusMessage);
        }
      },
      (err) => {
        this.errors = err;
        this.userService.addToast('error', err);
        this.isSubmitting = false;
      }
    );
  }
}
