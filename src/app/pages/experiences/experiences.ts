// src/app/pages/experiences/experiences.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import { Experience, ExperienceCard } from '../../components/experience-card/experience-card';
import { ShareExperience } from '../../dialogs/share-experience/share-experience';
import { ExperienceDetails } from '../../dialogs/experience-details/experience-details';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, ExperienceCard, ShareExperience, ExperienceDetails],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class ExperiencesPage implements OnInit {
  experiences: Experience[] = [];
  isLoading = true;
  showShareDialog = false;
  selectedExperience: Experience | null = null;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void { this.fetchExperiences(); }

  fetchExperiences(): void {
    this.isLoading = true;
    this.experienceService.getRecentExperiences(0, 10, {}).subscribe({
      next: (data) => {
        this.experiences = data.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load experiences:', err);
        this.isLoading = false;
      }
    });
  }

  // --- Modal Control Methods ---
  openShareDialog(shouldOpen: boolean): void {
    this.showShareDialog = shouldOpen;
  }

  onExperienceSubmitted(): void {
    this.showShareDialog = false;
    this.fetchExperiences();
  }

  viewExperienceDetails(experience: Experience): void {
    this.selectedExperience = experience;
  }

  closeDetailsModal(): void {
    this.selectedExperience = null;
  }
}