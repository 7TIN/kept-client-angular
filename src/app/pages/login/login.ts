import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios'; // We'll replace this with a service later

@Component({
  selector: 'app-login',
  standalone: true,
  // Import ReactiveFormsModule for form directives
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async handleSubmit() {
    this.errorMsg = null;
    if (this.loginForm.invalid) {
      return;
    }

    try {
      // NOTE: This logic should be moved to an AuthService
      const res = await axios.post(
        `http://localhost:8080/auth/login`, // Use your actual backend URL
        this.loginForm.value
      );

      const { token } = res.data;
      localStorage.setItem('token', token);
      
      // Ideally, you'd navigate to a dashboard, but let's go home for now
      this.router.navigate(['/']); 

    } catch (err: any) {
      this.errorMsg = err.response?.data?.message || 'Login failed. Check credentials.';
    }
  }
}