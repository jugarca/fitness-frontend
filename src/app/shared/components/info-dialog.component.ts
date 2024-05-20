import { Component } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  template: `
    <h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>{{message}}</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>
  `,
})
export class InfoDialogComponent {
  title = '';
  message = '';
}