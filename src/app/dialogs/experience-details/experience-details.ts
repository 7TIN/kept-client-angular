import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../components/experience-card/experience-card';
import { GenerateAnswerButton } from '../../components/generate-answer-button/generate-answer-button';

@Component({
  selector: 'app-experience-details',
  standalone: true,
  imports: [CommonModule,GenerateAnswerButton],
  templateUrl: './experience-details.html',
})
export class ExperienceDetails {
  @Input() experience: Experience | null = null;
  @Output() close= new EventEmitter<void>();
}