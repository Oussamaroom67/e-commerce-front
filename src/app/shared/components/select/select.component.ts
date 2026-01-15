import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input({required:true}) options!: string[];
  @Input() label: string = 'Select an option';
  @Output() selectedValue=new EventEmitter();
  
  onChange(event:any){
    this.selectedValue.emit(event);
  }
}
