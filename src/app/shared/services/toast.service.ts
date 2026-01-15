import { Injectable } from '@angular/core';
import { ToastOptions } from '../interfaces/toast-options';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private toastSubject =new Subject<ToastOptions>();
  toastState$=this.toastSubject.asObservable();
  show(options:ToastOptions){
    const toast = {duration:3000, ...options };
    this.toastSubject.next(toast);
  }

}
