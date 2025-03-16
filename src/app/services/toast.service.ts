import { Injectable } from '@angular/core';
import { ToastrService as TS } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: TS) {}

  success(msg: string, title: string = 'Sucesso') {
    this.toastr.success(msg, title)
  }

  error(msg: string, title: string = 'Error' ) {
    this.toastr.error(msg, title)
  }

}
