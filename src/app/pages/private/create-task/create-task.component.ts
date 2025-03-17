import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { parseISO, setHours, setMinutes, setSeconds, format } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  private ToastService = inject(ToastService);

  constructor(private apiService: ApiService, private router: Router) {
    if (!this.apiService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  loading: boolean = false;

  task: any = {
    title: '',
    description: '',
    finish_date_limit: ''
  }

  async onSubmit() {

    if (!this.task.finish_date_limit) {
      alert('Por favor, selecione uma data antes de enviar!');
      return;
    }

    const deadline_date = parseISO(this.task.finish_date_limit);
    const date_formatted = format(deadline_date, 'yyyy-MM-dd HH:mm:ss');

    const task_formatted = {
      ...this.task,
      finish_date_limit: date_formatted
    }

    try {
      this.loading = !this.loading
      await this.apiService.create_task(task_formatted);
      this.ToastService.success('Tarefa cadastrada com sucesso!', 'Sucesso!')
      this.loading = !this.loading
      this.router.navigate(['/tasks'])
    } catch(error) {
      console.log('Ocorreu um erro', error)
      this.ToastService.error('Erro ao criar tarefa')
      this.loading = !this.loading
    }
  }

}
