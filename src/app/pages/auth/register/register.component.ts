import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private ApiService = inject(ApiService);
  private ToastService = inject(ToastService);
  private router = inject(Router);

  loading:boolean = false;

  user: User = {
    name: '',
    email: '',
    password: ''
  }


  async onSubmit() {
    try {
      this.loading = !this.loading
      await this.ApiService.register(this.user);
      this.ToastService.success('Usuário cadastrado!', 'Sucesso!')
      this.loading = !this.loading
      this.router.navigate(['/login'])
    } catch(error) {
      console.log('Ocorreu um erro', error)
      this.ToastService.error('Erro ao cadastrar o usuário')
      this.loading = !this.loading
    }
  }

}
