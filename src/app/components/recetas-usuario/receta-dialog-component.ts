import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-receta-dialog',
    template: `
    <div class="dialog-content">
      <h1>{{data.nombre}}</h1>
      <p>{{data.descripcion}}</p>
      <p>{{data.kilocalorias}}</p>
      <p>{{data.tipoAlimentacion}}</p>
      <p>{{data.ingredientes}}</p>
      <button mat-button color="primary" (click)="cerrarDialogo()" class="close-button">Cerrar</button>
    </div>
    `,
    styles: [`
    .dialog-content {
      text-align: center;
      margin: 5px;
    }
    .close-button {
      float: right;
      margin: 5px;
    }
  `]
})
export class RecetaDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RecetaDialogComponent>) {}

    cerrarDialogo(): void {
        this.dialogRef.close();
      }
}