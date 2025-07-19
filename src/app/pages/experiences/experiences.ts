import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience';
import { ExperienceCard } from '../../components/experience-card/experience-card'; // Import the card
import { MatDialog } from '@angular/material/dialog';
import { ShareExperience } from '../../dialogs/share-experience/share-experience';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, ExperienceCard], // Import the card component here
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss'
})
export class ExperiencesPage implements OnInit {
  experiences: any[] = [];
  isLoading = true;

  // constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.fetchExperiences();
  }

  constructor(
    private experienceService: ExperienceService,
    private dialog: MatDialog
) {}

openShareDialog(): void {
    const dialogRef = this.dialog.open(ShareExperience, { width: '800px' });

    dialogRef.afterClosed().subscribe(result => {
        if (result) { // If form was submitted successfully
            this.fetchExperiences(); // Refresh the list
        }
    });
}


  fetchExperiences(): void {
    this.isLoading = true;
    // Fetch page 0, with 10 items, and no filters for now
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
}