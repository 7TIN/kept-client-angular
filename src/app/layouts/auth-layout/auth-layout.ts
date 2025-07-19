import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- Import RouterOutlet

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet], // <-- Add it to the imports array
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayout { }