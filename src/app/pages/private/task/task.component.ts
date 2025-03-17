import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  taskId!: string | null;
  loadingUpdate: boolean = false;
  loadingDelete: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  task:any = {
    title: '',
    description: '',
    owner: '',
    finish_date_limit: '',
    finished: 0,
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
          finish_date_limit: data.finished_date_limit,
          finished: data.finished ? true : false,
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit() {

      const deadline_date = parseISO(this.task.finish_date_limit);
      const date_formatted = format(deadline_date, 'yyyy-MM-dd HH:mm:ss');

      const task_formatted = {
        ...this.task,
        finished: this.task.finished ? 1 : 0,
        finish_date_limit: date_formatted
      }

      try {
        this.loadingUpdate = !this.loadingUpdate
        await this.apiService.updateTask(this.taskId, task_formatted);
        this.toastService.success('Tarefa cadastrada com sucesso!', 'Sucesso!')
        this.loadingUpdate = !this.loadingUpdate
        this.router.navigate(['/tasks'])
      } catch(error) {
        console.log('Ocorreu um erro', error)
        this.toastService.error('Erro ao atualizar a tarefa')
        this.loadingUpdate = !this.loadingUpdate
      }
    }

    async onDelete() {
      try {

        if (!confirm('Deseja realmente excluir essa tarefa?')) return

        this.loadingDelete = !this.loadingDelete
        await this.apiService.deleteTask(this.taskId);
        this.toastService.success('Tarefa excluída com sucesso!', 'Sucesso!')
        this.loadingDelete = !this.loadingDelete
        this.router.navigate(['/tasks'])
      } catch (error) {
        console.log(error)
        this.toastService.error('Erro ao deletar tarefa')
        this.loadingUpdate = !this.loadingUpdate
      }
    }

    async onChangeStatus() {
      console.log(this.task.finished)
      const status = this.task.finished ? 'Finalizado' : 'Pendente'
      try {
        const deadline_date = parseISO(this.task.finish_date_limit);
        const date_formatted = format(deadline_date, 'yyyy-MM-dd HH:mm:ss');

        const task_formatted = {
          ...this.task,
          finished: this.task.finished ? 1 : 0,
          finish_date_limit: date_formatted
        }

        this.loadingUpdate = !this.loadingUpdate
        await this.apiService.updateTask(this.taskId, task_formatted);
        this.toastService.success(`Status da tarefa atualizado para ${status}` ,'Sucesso!')
        this.loadingUpdate = !this.loadingUpdate
        this.router.navigate(['/tasks'])
      } catch (error) {
        console.log('Error ao atualizar status', error)
        this.toastService.error('Erro ao atualizar o status da Tarefa')
        this.loadingUpdate = !this.loadingUpdate
      }
    }

}
