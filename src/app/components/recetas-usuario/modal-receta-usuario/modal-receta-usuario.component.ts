import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposVO } from 'src/app/interfaces/tipos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-modal-receta-usuario',
  templateUrl: './modal-receta-usuario.component.html',
  styleUrls: ['./modal-receta-usuario.component.css']
})
export class ModalRecetaUsuarioComponent {

  isReadOnly: boolean = true;
  tipoOptions: TiposVO[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalRecetaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log(data);
      

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }

}