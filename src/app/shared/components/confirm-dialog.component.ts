import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="justify-content-end">
    <button mat-raised-button color="primary" [mat-dialog-close]="false"><mat-icon>cancel</mat-icon>Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true"><mat-icon>done</mat-icon>Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }
}