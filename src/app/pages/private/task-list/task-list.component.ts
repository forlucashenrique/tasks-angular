import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any = [];
  loading: boolean = false

  constructor(private apiService: ApiService, private router: Router) {
    if (!this.apiService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    try {
      this.loading = !this.loading
      const tasks = await this.apiService.fetchAllTask()
      this.tasks = tasks;
      this.loading = !this.loading

    } catch (error) {
      console.log(error)
    }
  }


  showTaskDetails(id: number) {
    this.router.navigate(['/tasks', id])
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
