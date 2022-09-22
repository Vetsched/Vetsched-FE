import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = {errors: {}};
  authType = 'login';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) { 
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      // 'password': ['', Validators.required, ],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+\\|:;',.\<>/?~])[A-Za-z\d!@#$%^&*-_=+\\|:;',.\<>/?~].{7,}$")]]
    });
  }

  ngOnInit(): void {
  }


  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    delete this.authForm.value.password1;

    const credentials = this.authForm.value;

    console.log(this.authForm.value)
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

}
