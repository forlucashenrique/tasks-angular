import { inject, Injectable } from '@angular/core';
import { User } from '../types/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost:3000/api/v1'
  private appKeyToken: string = 'todoapp@authToken'

  constructor() { }

  async register(user: User) {
    const response = await axios.post(`${this.apiUrl}/user`, user)
    return response.data;
  }


  async login(user: User) {

    try {
      const response = await axios.post(`${this.apiUrl}/login`, user)
      const token = response.data.data.token;

      if (token) {
        localStorage.setItem(this.appKeyToken, token)
        return true;
      }

      return false;
    } catch (error) {
      console.log('Erro ao fazer login');
      return false;
    }

  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem(this.appKeyToken);
  }

  getToken() {
    return localStorage.getItem(this.appKeyToken);
  }

  logout() {
    localStorage.removeItem(this.appKeyToken);
  }

  async fetchAllTask() {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      })

      return response.data.data
    } catch (error) {
      console.log(error)
      return false;
    }
  }


}
