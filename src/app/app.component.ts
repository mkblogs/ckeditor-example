import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';

export interface Account {
  name?: string;
  type?: string;
  address?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: Account[] = [
    {
      name: 'John Doe',
      type: 'Saving',
      address: '123 Main St',
      description: 'Personal savings account'
    },
    {
      name: 'Jane Smith',
      type: 'Current',
      address: '456 Elm St',
      description: 'Business current account'
    }
  ];

  addAccount(account: Account) {
    this.accounts = [...this.accounts, account];
  }
}
