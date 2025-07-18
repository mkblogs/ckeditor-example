import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Account {
  id: number;
  name: string;
  type: string;
  address: string;
  description: string;
}

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  editForm: FormGroup | null = null;
  editingId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.http.get<Account[]>('http://localhost:3000/accounts')
      .subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.http.delete(`http://localhost:3000/accounts/${id}`)
        .subscribe(() => this.loadAccounts());
    }
  }

  startEdit(account: Account) {
    this.editingId = account.id;
    this.editForm = this.fb.group({
      name: [account.name],
      type: [account.type],
      address: [account.address],
      description: [account.description]
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = null;
  }

  saveEdit(id: number) {
    if (this.editForm && this.editForm.valid) {
      this.http.put(`http://localhost:3000/accounts/${id}`, this.editForm.value)
        .subscribe(() => {
          this.cancelEdit();
          this.loadAccounts();
        });
    }
  }
} 