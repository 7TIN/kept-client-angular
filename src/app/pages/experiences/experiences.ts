import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import {
  Experience,
  ExperienceCard,
} from '../../components/experience-card/experience-card';
import { ShareExperienceDialog } from '../../dialogs/share-experience/share-experience';
import { ExperienceDetails } from '../../dialogs/experience-details/experience-details';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ExperienceCard, ShareExperienceDialog, ExperienceDetails],
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
  search = '';
  position = '';
  type = '';
  companyName = '';
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.fetchExperiences(0));

    this.route.queryParams.subscribe((params) => {
      this.companyName = params['company'] || '';
      this.fetchExperiences(0);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.searchSubject.next(value);
  }

  onPositionChange(value: string): void {
    this.position = value;
    this.fetchExperiences(0);
  }

  onTypeChange(value: string): void {
    this.type = value;
    this.fetchExperiences(0);
  }

  getFilters() {
    return {
      q: this.search || undefined,
      position: this.position || undefined,
      type: this.type || undefined,
      company: this.companyName || undefined,
    };
  }

  removeCompanyFilter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { company: null },
      queryParamsHandling: 'merge',
    });
  }

  fetchExperiences(page: number): void {
    this.isLoading = true;
    this.error = null;

    const filters = this.getFilters();

    this.experienceService.getExperiences(page, this.pageSize, filters).subscribe({
      next: (data) => {
        this.experiences = data.content; // no need to map, API includes companyName
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load experiences';
        this.isLoading = false;
        this.experiences = [];
      }
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
    const token = localStorage.getItem('token');
    if (token) {
      this.showShareDialog = shouldOpen;
    } else {
      const redirectUrl = this.router.url;
      this.router.navigate(['/login'], {
        queryParams: {
          message: 'login_required',
          redirect: redirectUrl,
        },
      });
    }
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
