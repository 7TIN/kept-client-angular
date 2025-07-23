// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayout } from './layouts/app-layout/app-layout'; // <-- Import
import { AuthLayout } from './layouts/auth-layout/auth-layout'; // <-- Import

@Component({
  selector: 'app-root',
  standalone: true,
  // Make sure layouts are imported here
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'kept-client-angular';
}