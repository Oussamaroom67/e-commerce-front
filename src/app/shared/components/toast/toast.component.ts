import { Component } from '@angular/core';
import { ToastOptions } from '../../interfaces/toast-options';
import { ToastType } from '../../enums/toast-types';
import { TOAST_COLORS } from '../../constants/toast-colors';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toasts: ToastOptions[] = [];
  TOAST_COLORS = TOAST_COLORS;
  ToastType = ToastType; // pour le template
  constructor(private toastService:ToastService){
    this.toastService.toastState$.subscribe(toast=>{
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts=this.toasts.filter(t=>t!=toast)
      }, toast.duration);
    })
  }
}
