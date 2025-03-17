import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  private apiService = inject(ApiService);
  private router = inject(Router);

  userLogged: any

  ngOnInit( ) {
    this.userLogged = this.apiService.getUserLogged()
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

}
