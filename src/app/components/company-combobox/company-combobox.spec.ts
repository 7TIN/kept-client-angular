import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCombobox } from './company-combobox';

describe('CompanyCombobox', () => {
  let component: CompanyCombobox;
  let fixture: ComponentFixture<CompanyCombobox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCombobox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCombobox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
