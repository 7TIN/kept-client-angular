import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule for ngModel
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company';
import { CompanyCard } from '../../components/company-card/company-card';

// Define an interface for our company data
export interface CompanyWithCount {
  id: number;
  name: string;
  experienceCount: number;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, CompanyCard], // <-- Add FormsModule and CompanyCard
  templateUrl: './companies.html',
  styleUrl: './companies.scss'
})
export class CompaniesPage implements OnInit {
  companies: CompanyWithCount[] = [];
  isLoading = true;
  sortBy: 'alphabetical' | 'experienceCount' = 'alphabetical';

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getAllWithExperienceCount().subscribe({
      next: (data) => {
        this.companies = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load companies:', err);
        this.isLoading = false;
      }
    });
  }

  // A getter that returns the sorted list of companies
  get sortedCompanies(): CompanyWithCount[] {
    return [...this.companies].sort((a, b) => {
      if (this.sortBy === 'experienceCount') {
        return b.experienceCount - a.experienceCount;
      }
      return a.name.localeCompare(b.name);
    });
  }

  // Navigate to the experiences page with a company filter
  navigateToCompanyExperiences(companyName: string): void {
    this.router.navigate(['/experience'], {
      queryParams: { company: companyName }
    });
  }
}