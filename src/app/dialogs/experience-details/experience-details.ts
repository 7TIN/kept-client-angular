import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../components/experience-card/experience-card';

@Component({
  selector: 'app-experience-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-details.html',
})
export class ExperienceDetails {
  @Input() experience: Experience | null = null;
  @Output() closeModal = new EventEmitter<void>();
}