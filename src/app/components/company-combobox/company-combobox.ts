import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { ExperienceService } from '../../services/experience';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-combobox',
  templateUrl: './company-combobox.html',
  styleUrls: ['./company-combobox.scss'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class CompanyComboboxComponent implements OnInit {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  queryControl = new FormControl('');
  loading = false;
  results: { id: number; name: string }[] = [];
  isDropdownOpen = false; // ✅ New flag
  private querySubject = new Subject<string>();

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.queryControl.setValue(this.value);

    this.queryControl.valueChanges.pipe(
      tap(v => {
        this.querySubject.next(v ?? '');
        this.isDropdownOpen = true; // ✅ Open dropdown on typing
      })
    ).subscribe();

    this.querySubject.pipe(
      debounceTime(300),
      tap(() => this.loading = true),
      switchMap(q => this.experienceService.searchCompanies(q || ''))
    ).subscribe(data => {
      this.results = data;
      this.loading = false;
    });
  }

  selectCompany(name: string) {
    this.valueChange.emit(name);
    this.queryControl.setValue(name);
    this.isDropdownOpen = false; // ✅ Close dropdown
  }

  isExactMatch(): boolean {
    const lowerQuery = (this.queryControl.value || '').trim().toLowerCase();
    return this.results.some(c => c.name.toLowerCase() === lowerQuery);
  }

  createCompany() {
    const value = this.queryControl.value?.trim();
    if (value) {
      this.valueChange.emit(value);
      this.queryControl.setValue(value);
      this.isDropdownOpen = false; // ✅ Close on create
    }
  }
}