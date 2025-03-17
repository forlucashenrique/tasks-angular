import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  userLogged: any

  ngOnInit( ) {
    this.userLogged = this.apiService.getUserLogged()
  }

  async logout() {
    try {
      await this.apiService.logout();
      this.router.navigate(['/login']);
      this.toastService.success('Logout', 'Sucesso')

    } catch (error) {
      console.log(error)
      this.toastService.error('Logout', 'Error')
    }
  }

}
