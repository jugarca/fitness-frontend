import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}