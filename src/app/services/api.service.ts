import { inject, Injectable, WritableSignal } from '@angular/core';
import { User } from '../types/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://localhost:3000/api/v1'
  private appKeyToken: string = 'todoapp@authToken'
  private appUserLogged: string = 'todoapp@user'

  constructor() { }

  async register(user: User) {
    const response = await axios.post(`${this.apiUrl}/user`, user)
    return response.data;
  }

  async login(user: User) {

    try {
      const response = await axios.post(`${this.apiUrl}/login`, user)
      const token = response.data.data.token;
      const userLogged = response.data.data.user;

      if (token) {
        localStorage.setItem(this.appKeyToken, token)
        localStorage.setItem(this.appUserLogged, JSON.stringify(userLogged))
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

  getUserLogged() {

    const user = localStorage.getItem(this.appUserLogged)
    return JSON.parse(user!)
  }


  logout() {
    localStorage.removeItem(this.appKeyToken);
    localStorage.removeItem(this.appUserLogged);
  }

  async fetchAllTask(query?: WritableSignal<string>) {
    try {

      // let response: any;

      // if (query) {
      //   response = await axios.get(`${this.apiUrl}/tasks?status=${query}`, {
      //     headers: {
      //       'Authorization': `Bearer ${this.getToken()}`
      //     }
      //   })

      //   return response.data.data
      // }

      const response = await axios.get(`${this.apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      })

      return response.data.data
    } catch (error) {

      console.log(error)
      return false
    }
  }

  async create_task(task: any) {
    const response = await axios.post(`${this.apiUrl}/tasks`, task, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    })
    return response.data;
  }

  async getTaskById(id: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar task:', error);
      throw error;
    }
  }

  async updateTask(id: string | null, task: any) {
    try {
      const response = await axios.put(`${this.apiUrl}/tasks/${id}`, task, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  async deleteTask(id: string | null) {
    try {
      await axios.delete(`${this.apiUrl}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }
}
