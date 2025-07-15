import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit { 
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
  }

  handleLogout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}