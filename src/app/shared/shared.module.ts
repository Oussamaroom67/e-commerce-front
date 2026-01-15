import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { ToastType } from './enums/toast-types';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    ToastComponent,
    FormsModule
  ]
})
export class SharedModule { }
