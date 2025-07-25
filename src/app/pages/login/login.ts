import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  // Import ReactiveFormsModule for form directives
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private baseUrl = environment.AUTH_BASE_URL;
  

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
      const res = await axios.post(
        `http://localhost:8080/auth/login`, 
        this.loginForm.value
      );

      const { token } = res.data;
      localStorage.setItem('token', token);
      
      this.router.navigate(['/']); 

    } catch (err: any) {
      this.errorMsg = err.response?.data?.message || 'Login failed. Check credentials.';
    }
  }
}