import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  success(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  error(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

  warning(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
  }

  info(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }

  question(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      confirmButtonText: 'Ok'
    });
  }

  confirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar'
    });
  }

  confirmDelete(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });
  }
}
