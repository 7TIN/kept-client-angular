import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  async handleSubmit() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.signupForm.invalid) {
      if (this.signupForm.hasError('mismatch')) {
        this.errorMsg = 'Passwords do not match.';
      }
      return;
    }

    try {
      const formValue = this.signupForm.value;
      // NOTE: Should be moved to an AuthService
      await axios.post('http://localhost:8080/auth/register', {
        name: formValue.name,
        username: formValue.username,
        email: formValue.email,
        password: formValue.password
      });

      this.successMsg = 'Registration successful! You can now log in.';

    } catch (err: any) {
      this.errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
    }
  }
}