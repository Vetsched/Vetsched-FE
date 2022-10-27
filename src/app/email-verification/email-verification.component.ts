import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['EmailToken'] != null && params['Email'] != null) {
        this.service
          .verifyEmail(params['Email'], params['EmailToken'])
          .subscribe((x: any) => {
            if (x.statusCode == 200) {
              this.service.addToast('success', 'Email Verified successfully!');
              this.router.navigate(['/login']);
            } else {
              this.service.addToast(
                'error',
                x.statusMessage || 'No Verification Token!'
              );
              this.router.navigate(['/login']);
            }
          });
      } else {
        this.service.addToast('error', 'No Verification Token!');
        this.router.navigate(['/login']);
      }
    });
  }
}
