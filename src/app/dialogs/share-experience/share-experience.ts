import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ExperienceService } from '../../services/experience';
import { CompanyService } from '../../services/company';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-share-experience',
  standalone: true,
  // This 'imports' array is the key to fixing the errors
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './share-experience.html',
})
export class ShareExperience implements OnInit {
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<ShareExperience>
  ) {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      summary: ['', Validators.required],
      // This is a FormArray to hold a dynamic number of questions
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addQuestion(); // Start with one question field by default
  }

  // Getter to easily access the questions FormArray
  get questions(): FormArray {
    return this.experienceForm.get('questions') as FormArray;
  }

  // Method to add a new question group to the FormArray
  addQuestion(): void {
    const questionForm = this.fb.group({
      questionText: ['', Validators.required],
      questionType: ['TECHNICAL', Validators.required]
    });
    this.questions.push(questionForm);
  }

  // Method to remove a question from the FormArray at a specific index
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // Method to handle the form submission
  onSubmit(): void {
    if (this.experienceForm.invalid) {
      return;
    }

    const formValue = this.experienceForm.value;

    this.companyService.searchCompanies(formValue.companyName).pipe(
      // switchMap allows us to chain dependent asynchronous operations
      switchMap(companies => {
        const existingCompany = companies.find(c => c.name.toLowerCase() === formValue.companyName.toLowerCase());
        // If the company exists, return it. Otherwise, create a new one.
        if (existingCompany) {
          return of(existingCompany);
        }
        return this.companyService.createCompany(formValue.companyName);
      }),
      switchMap(company => {
        // Now that we have the company ID, create the final payload
        const payload = {
            title: formValue.title,
            position: 'SDE-1', // Placeholder - add this to your form
            experienceType: 'TECHNICAL', // Placeholder - add this to your form
            interviewDate: new Date().toISOString().split('T')[0], // Placeholder - add this to your form
            summary: formValue.summary,
            companyId: company.id,
            questions: formValue.questions.map((q: any) => ({
                question: q.questionText,
                type: q.questionType,
                section: q.questionType, // Section can be the same as type
            })),
        };
        // Call the service to add the experience
        return this.experienceService.addExperience(payload);
      })
    ).subscribe({
      next: () => this.dialogRef.close(true), // Close the dialog on success
      error: (err) => console.error("Failed to submit experience", err)
    });
  }
}