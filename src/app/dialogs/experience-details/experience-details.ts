import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Experience } from '../../components/experience-card/experience-card'; // Reuse our interface

@Component({
  selector: 'app-experience-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './experience-details.html',
})
export class ExperienceDetails {
  // Inject the data passed into the dialog
  constructor(@Inject(MAT_DIALOG_DATA) public experience: Experience) {}
}