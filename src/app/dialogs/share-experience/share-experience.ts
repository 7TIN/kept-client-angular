import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExperienceService } from '../../services/experience';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-experience',
  templateUrl: './share-experience.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class ShareExperienceDialog implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();

  experienceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      experienceType: ['TECHNICAL', Validators.required],
      interviewDate: ['', Validators.required],
      summary: ['', Validators.required],
      questions: this.fb.array([
        this.fb.group({
          questionText: ['', Validators.required],
          questionType: ['TECHNICAL', Validators.required],
        }),
      ]),
    });
  }

  get questions(): FormArray {
    return this.experienceForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(
      this.fb.group({
        questionText: ['', Validators.required],
        questionType: ['TECHNICAL', Validators.required],
      })
    );
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  async onSubmit(): Promise<void> {
    if (this.experienceForm.invalid) return;

    const values = this.experienceForm.value;
    const normalized = values.companyName.trim().toLowerCase();

    try {
      const searchRes = await this.api
        .get('/companies', { params: { q: values.companyName.trim() } })
        .toPromise();

      let company = (searchRes as any[]).find(
        (c) => c.name.toLowerCase() === normalized
      );

      if (!company) {
        const createRes = await this.api
          .post('/companies', { name: values.companyName })
          .toPromise();
        company = createRes;
      }

      const payload = {
        title: values.title,
        position: values.position,
        experienceType: values.experienceType,
        summary: values.summary,
        interviewDate: values.interviewDate, // Already in yyyy-MM-dd format
        companyId: company.id,
        questions: values.questions.map((q: any) => ({
          question: q.questionText,
          type: q.questionType,
          section: q.questionType,
        })),
      };

      await this.experienceService.addExperience(payload).toPromise();

      this.submitted.emit();
      this.close.emit();
    } catch (err) {
      console.error('Failed to submit experience:', err);
    }
  }
}
