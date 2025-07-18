import { Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';

export const routes: Routes = [
  { path: '', component: AccountListComponent },
  { path: 'create-account', component: AccountCreationComponent },
  { path: 'edit-account/:id', component: AccountCreationComponent }
]; 