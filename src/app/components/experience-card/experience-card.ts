import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceDetails } from '../../dialogs/experience-details/experience-details';

// This interface can be moved to a separate models file later
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
  styleUrl: './experience-card.scss'
})
export class ExperienceCard {
  // @Input() tells Angular that this property will be passed in from a parent component
  @Input() experience!: Experience;

  // This makes the 'dateLabel' property available in your HTML template
  get dateLabel(): string {
    if (!this.experience?.interviewDate) {
      return '';
    }
    // The date from the backend might include time, so we split it off
    const datePart = this.experience.interviewDate.split('T')[0];
    return format(new Date(datePart), 'PPP');
  }

  constructor(private dialog: MatDialog) {}

  openDetails(): void {
  this.dialog.open(ExperienceDetails, {
    data: this.experience, // Pass the experience data to the dialog
    width: '600px',
  }); 
}
}
