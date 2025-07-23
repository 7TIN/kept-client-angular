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

  // --- Pagination State ---
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5; // You can adjust how many items to show per page

  // --- Modal State ---
  showShareDialog = false;
  selectedExperience: Experience | null = null;

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.fetchExperiences(this.currentPage);
  }

  fetchExperiences(page: number): void {
    this.isLoading = true;
    this.experienceService.getRecentExperiences(page, this.pageSize, {}).subscribe({
      next: (data) => {
        this.experiences = data.content;
        this.currentPage = data.number; // The backend returns the current page number
        this.totalPages = data.totalPages; // The backend returns the total number of pages
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load experiences:', err);
        this.isLoading = false;
      }
    });
  }

  // --- Pagination Controls ---
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

  // --- Modal Control Methods (no changes here) ---
  openShareDialog(shouldOpen: boolean): void {
    this.showShareDialog = shouldOpen;
  }

  onExperienceSubmitted(): void {
    this.showShareDialog = false;
    this.fetchExperiences(0); // Go back to the first page after submitting
  }

  viewExperienceDetails(experience: Experience): void {
    this.selectedExperience = experience;
  }

  closeDetailsModal(): void {
    this.selectedExperience = null;
  }
}