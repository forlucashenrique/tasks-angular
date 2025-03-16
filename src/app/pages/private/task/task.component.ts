import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  taskId!: string | null;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastService: ToastService,
  ) {}

  task:any = {
    title: '',
    description: '',
    owner: '',
    finish_date_limit: ''
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.taskId = id;
      if (this.taskId) {
        await this.loadTask(this.taskId)
      }
    })
  }


  async loadTask(id: string) {
    try {
      const res = await this.apiService.getTaskById(id);

      if (res.message === 'success') {

        const data = res.data;

        this.task = {
          title: data.title,
          description: data.description,
          owner: data.owner,
          finish_date_limit: data.finished_date_limit
        }
      }

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit() {

      // const deadline_date = parseISO(this.task.finish_date_limit);
      // const date_formatted = format(deadline_date, 'yyyy-MM-dd HH:mm:ss');

      // const task_formatted = {
      //   ...this.task,
      //   finish_date_limit: date_formatted
      // }

      // try {
      //   this.loading = !this.loading
      //   await this.apiService.create_task(task_formatted);
      //   this.ToastService.success('Tarefa cadastrada com sucesso!', 'Sucesso!')
      //   this.loading = !this.loading
      //   this.router.navigate(['/tasks'])
      // } catch(error) {
      //   console.log('Ocorreu um erro', error)
      //   this.ToastService.error('Erro ao criar tarefa')
      //   this.loading = !this.loading
      // }
    }

}
