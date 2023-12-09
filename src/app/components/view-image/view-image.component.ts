import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:string, private dialogRef: MatDialogRef<ViewImageComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
