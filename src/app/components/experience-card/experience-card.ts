import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

export interface Experience {
  id: number;
  title: string;
  position: string;
  companyName: string;
  experienceType: string;
  interviewDate: string;
  summary: string;
  questions: any[];
}

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-card.html',
})
export class ExperienceCard {
  @Input() experience!: Experience;
  @Output() viewDetails = new EventEmitter<Experience>();

  get dateLabel(): string {
    if (!this.experience?.interviewDate) return '';
    const datePart = this.experience.interviewDate.split('T')[0];
    return format(new Date(datePart), 'PPP');
  }
}