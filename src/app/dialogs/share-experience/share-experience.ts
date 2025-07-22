import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { format } from 'date-fns';

// --- Your Services ---
import { ExperienceService } from '../../services/experience';
import { CompanyService } from '../../services/company';

@Component({
  selector: 'app-share-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './share-experience.html',
})
export class ShareExperience implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() experienceSubmitted = new EventEmitter<void>();
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private companyService: CompanyService
    // We don't need a DialogRef from a library anymore
  ) {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      experienceType: ['TECHNICAL', Validators.required],
      interviewDate: ['', Validators.required], // Start empty for date input
      summary: ['', Validators.required],
      questions: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.addQuestion();
  }

  // --- All of your other methods (get questions, addQuestion, removeQuestion) remain exactly the same ---
  get questions(): FormArray {
    return this.experienceForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.group({
      questionText: ['', Validators.required],
      questionType: ['TECHNICAL', Validators.required],
    }));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // --- The form submission logic is now simpler ---
  onSubmit(): void {
    if (this.experienceForm.invalid) {
      return;
    }

    const formValue = this.experienceForm.value;
    const companyName = formValue.companyName;

    this.companyService.searchCompanies(companyName).pipe(
      switchMap(companies => {
        const existingCompany = companies.find(c => c.name.toLowerCase() === companyName.toLowerCase());
        // If the company exists, return it. Otherwise, create it.
        return existingCompany ? of(existingCompany) : this.companyService.createCompany(companyName);
      }),
      switchMap(company => {
        // Create the final payload to send to the backend
        const payload = {
          ...formValue,
          companyId: company.id,
          companyName: company.name,
          interviewDate: format(new Date(formValue.interviewDate), 'yyyy-MM-dd'),
          questions: formValue.questions.map((q: any) => ({
            question: q.questionText,
            type: q.questionType,
            section: q.questionType,
          })),
        };
        return this.experienceService.addExperience(payload);
      })
    ).subscribe({
      next: (response) => {
        console.log('Experience submitted successfully!', response);
        // Here you would close the dialog or navigate away
      },
      error: (err) => console.error("Failed to submit experience", err),
    });
  }
}