import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disable: boolean = true;
  @Output() checkedChange: EventEmitter<{ checked:boolean, label: string}> = new EventEmitter<{ checked:boolean, label: string}>();

  constructor() { }

  ngOnInit() {
  }

  changeChecked(){
    this.checked = !this.disable ? !this.checked : this.checked;
    this.checkedChange.emit({ checked: this.checked, label: this.label});
  }

}
