// src/app/components/mobile-nav/mobile-nav.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-nav.html',
  styleUrls: ['./mobile-nav.scss']
})
export class MobileNav {
  isOpen = false;

  constructor(public router: Router) {}

  toggleNav() {
    this.isOpen = !this.isOpen;
  }

  closeNav() {
    this.isOpen = false;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}

