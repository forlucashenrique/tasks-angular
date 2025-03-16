import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TaskListComponent } from './pages/private/task-list/task-list.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CreateTaskComponent } from './pages/private/create-task/create-task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskComponent } from './pages/private/task/task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: LayoutComponent,
    children: [
      { path: '', component: TaskListComponent },
      { path: ':id', component: TaskComponent },
      { path: 'create', component: CreateTaskComponent },
    ]
  },
];
