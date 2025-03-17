import { Component, signal, } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';

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

  // async taskFilter(event: any) {
  //   const value = event.target.value
  //   this.selectedValue.set(value)
  //   const tasks = await this.apiService.fetchAllTask(this.selectedValue)

  //   //this.tasks.set(tasks)
  //   console.log(tasks)
  //   console.log(typeof tasks)
  //   console.log(Array.isArray(tasks))


  //   // console.log(event.target.value)

  //   // return this.tasks.filter((task:any) => task.status === value)
  // }
}
