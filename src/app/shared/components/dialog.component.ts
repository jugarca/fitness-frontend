import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-example',
    template: `
    <h2 mat-dialog-title>Registro</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="justify-content-end">
      <button mat-raised-button color="primary" [mat-dialog-close]="true"><mat-icon>done</mat-icon>Aceptar</button>
    </mat-dialog-actions>
    `,
})
export class DialogComponent {
    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
    }