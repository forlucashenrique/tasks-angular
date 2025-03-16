import { Component } from '@angular/core';
import { User } from '../../../types/user';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loading: boolean = false
    user: User = {
      email: '',
      password: ''
    }

}
