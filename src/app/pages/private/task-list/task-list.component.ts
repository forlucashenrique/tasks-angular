import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any = [];

  constructor(private apiService: ApiService, private router: Router) {
    if (!this.apiService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    try {
      const tasks = await this.apiService.fetchAllTask()
      console.log(tasks);
      this.tasks = tasks;
    } catch (error) {
      console.log(error)
    }
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
