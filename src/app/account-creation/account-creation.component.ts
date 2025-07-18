import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { editorConfig } from '../ckeditor/editor.config';
import { ClassicEditor } from 'ckeditor5';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CKEditorModule, CkeditorComponent],
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent implements OnInit {
  accountForm!: FormGroup;
  config = editorConfig;
  protected readonly Editor = ClassicEditor;
  accountTypes = [
    { value: 'saving', label: 'Saving' },
    { value: 'current', label: 'Current' }
  ];
  @Output() accountCreated = new EventEmitter<any>();
  isEditMode = false;
  accountId: string | null = null;
  accountOriginal: any = null;
  fieldname = "description";
  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.accountId = id;
        this.http.get<any>(`http://localhost:3000/accounts`).subscribe(accounts => {
          const account = Array.isArray(accounts) ? accounts.find((a: any) => a.id == id) : null;
          if (account) {
            this.accountOriginal = account;
            this.accountForm.patchValue(account);
          }
        });
      } else {
        this.isEditMode = false;
        this.accountId = null;
        this.accountOriginal = null;
      }
    });
  }

  initForm() {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],     
    });
  }

  onSubmit() {
    console.log(this.accountForm);
    
    if (this.accountForm.valid) {
      if (this.isEditMode && this.accountId) {
        this.http.put(`http://localhost:3000/accounts/${this.accountId}`, this.accountForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Failed to update account:', err);
            }
          });
      } else {
        this.http.post('http://localhost:3000/accounts', this.accountForm.value)
          .subscribe({
            next: () => {
              this.accountCreated.emit(this.accountForm.value);
              this.resetForm();
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Failed to save account:', err);
            }
          });
      }
    } else {
      this.markFormGroupTouched();
    }      
  }

  markFormGroupTouched() {
    Object.keys(this.accountForm.controls).forEach(key => {
      const control = this.accountForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm() {
    if (this.isEditMode && this.accountOriginal) {
      this.accountForm.reset({
        name: this.accountOriginal.name,
        type: this.accountOriginal.type,
        address: this.accountOriginal.address,
        description: this.accountOriginal.description
      });
    } else {
      this.accountForm.reset({
        name: '',
        type: '',
        address: '',
        description: ''
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.accountForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
