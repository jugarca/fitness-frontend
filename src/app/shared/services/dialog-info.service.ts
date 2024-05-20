import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../components/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogInfoService {
  constructor(private dialog: MatDialog) { }

  openInfoDialog(msg: string) {
    return this.dialog.open(InfoDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}