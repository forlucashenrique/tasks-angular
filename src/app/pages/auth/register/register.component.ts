import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';



@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private ApiService = inject(ApiService);
  private ToastService = inject(ToastService);


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

    } catch(error) {
      console.log('Ocorreu um erro', error)
      this.ToastService.error('Erro ao cadastrar o usuário')
      this.loading = !this.loading
    }
  }

}
