import { Component, inject } from '@angular/core';
import { User } from '../../../types/user';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private apiService: ApiService) {
      if (this.apiService.isUserAuthenticated()) {
        this.router.navigate(['/list']);
      }
    }

    private ToastService = inject(ToastService);
    private router = inject(Router)

    loading: boolean = false
    user: User = {
      email: '',
      password: ''
    }

    async onSubmit() {
        this.loading = !this.loading
        const res = await this.apiService.login(this.user);

        if (res) {
          this.ToastService.success('Login realizado com sucesso!', 'OK')
          this.loading = !this.loading
          this.router.navigate(['/list'])
        } else {
          this.loading = !this.loading
          this.ToastService.error('Verifique as credenciais', 'Error ao fazer login')
        }
    }

}
