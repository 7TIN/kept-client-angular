import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-card.html',
  styleUrl: './company-card.scss'
})
export class CompanyCard {
  // @Input() allows a parent component to pass data into this component
  @Input() name: string = '';
  @Input() experienceCount: number = 0;
}