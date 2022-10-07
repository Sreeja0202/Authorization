import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  respondeData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authservice: AuthService
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        aemail: ['', [Validators.required, Validators.email]],
        apassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  logIn() {
    if (this.loginForm.valid) {
      this.authservice.loginUser(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          this.respondeData = res;
          localStorage.setItem('token', this.respondeData.token);
          alert('Login Successfull!!!');
          this.loginForm.reset();
          this.router.navigate(['/special-events']);
        },
        (err) => {
          alert('Some error occured');
          console.log(err);
        }
      );
    } else {
      alert('Please enter valid login  credentials');
    }
  }
}
