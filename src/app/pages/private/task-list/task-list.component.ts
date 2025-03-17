import { Component, signal, } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any[] = []
  loading: boolean = false
  selectedValue = signal('')

  constructor(private apiService: ApiService, private router: Router) {
    if (!this.apiService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit() {
    try {
      this.loading = !this.loading
      const tasks = await this.apiService.fetchAllTask()
      this.tasks = tasks.map((task: any) => {

        const formatted_date = parseISO(task.finished_date_limit)

        return {
          ...task,
          finished_date_limit: format(formatted_date, 'dd/MM/yyy')
        }
      });
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
