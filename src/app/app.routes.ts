import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TaskListComponent } from './pages/private/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: TaskListComponent }
];
