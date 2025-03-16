import { inject, Injectable } from '@angular/core';
import { User } from '../types/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/v1'

  constructor() { }

  async register(user: User) {
    const response = await axios.post(`${this.apiUrl}/user`, user)
    return response.data;
  }

}
