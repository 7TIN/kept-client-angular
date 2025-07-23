import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import {
  Experience,
  ExperienceCard,
} from '../../components/experience-card/experience-card';
import { ShareExperience } from '../../dialogs/share-experience/share-experience';
import { ExperienceDetails } from '../../dialogs/experience-details/experience-details';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, ExperienceCard, ShareExperience, ExperienceDetails],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
})
export class ExperiencesPage implements OnInit {
  experiences: Experience[] = [];
  isLoading = false;
  error: string | null = null;

  currentPage = 0;
  totalPages = 0;
  pageSize = 5;

  showShareDialog = false;
  selectedExperience: Experience | null = null;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.fetchExperiences(this.currentPage);
  }

  fetchExperiences(page: number, filters: any = {}): void {
    this.isLoading = true;
    this.error = null;

    this.experienceService
      .getRecentExperiences(page, this.pageSize, filters)
      .subscribe({
        next: (data) => {
          this.experiences = data.content;
          this.currentPage = data.number;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.isLoading = false;
        },
      });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.fetchExperiences(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.fetchExperiences(this.currentPage - 1);
    }
  }

  openShareDialog(shouldOpen: boolean): void {
    this.showShareDialog = shouldOpen;
  }

  onExperienceSubmitted(): void {
    this.showShareDialog = false;
    this.fetchExperiences(0);
  }

  viewExperienceDetails(experience: Experience): void {
    this.selectedExperience = experience;
  }

  closeDetailsModal(): void {
    this.selectedExperience = null;
  }
}
