import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        aemail: ['', [Validators.required, Validators.email]],
        apassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  signUp() {
    if (this.signupForm.valid) {
      this.authservice.signupUSer(this.signupForm.value).subscribe(
        (res) => {
          console.log(res);
          alert('Signup successfull');
          localStorage.setItem('token', res.token);
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please enter valid credentials');
    }
  }
}
