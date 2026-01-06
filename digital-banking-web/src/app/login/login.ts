import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required])
    });
  }

  handleLogin() {
    let username = this.loginFormGroup!.value.username;
    let password = this.loginFormGroup!.value.password;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin/customers");
      },
      error: err => {
        this.errorMessage = "Authentication Failed";
      }
    })
  }
}
