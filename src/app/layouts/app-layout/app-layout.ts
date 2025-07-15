// src/app/layouts/app-layout/app-layout.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar'; // <-- Correct path to your navbar.ts

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar], // <-- Import Navbar here
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss'
})
export class AppLayout {}