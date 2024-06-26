import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ParametrosService } from 'src/app/services/parametros.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { RecetasIngredientesService } from '../../../../services/recetas-ingredientes.service';
import { RecetasAlimentosVO } from 'src/app/interfaces/recetas-ingredientes.interface';
import { ValoresTipoVO } from 'src/app/interfaces/valoresTipos.interface';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit-receta',
  templateUrl: './edit-receta.component.html',
  styleUrls: ['./edit-receta.component.css']
})
export class EditRecetaComponent {

  tiposAlimentacion: string[] = ['Vegetariana', 'Vegana', 'Sin gluten', 'Omnívora'];
  // Datos de la tabla
  ingredientes:RecetasAlimentosVO[] = [];
  displayedColumns: string[] = ['idIngrediente', 'cantidad','acciones'];
  tiposIngredientes: ValoresTipoVO[] = [];
  form: FormGroup;


  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRecetaComponent>,
    private recetasService: RecetasService,
    private recetasIngredientesService: RecetasIngredientesService,
    private parametrosService: ParametrosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ) {

    

    this.parametrosService.getByTipo('INGREDIENTE').subscribe(data => {
      this.tiposIngredientes = data;
    });

    // Si se inserta un registro nuevo se crea un formulario vacio
    if (data == null){
      this.form = this.fb.group({
        id: [null], 
        nombrePlato: [null, Validators.required],
        descripcion: [null, Validators.required],
        kilocalorias: [null, Validators.required],
        tipoAlimentacion: [null, Validators.required],
        imagen: [null]
        // Agrega más controles aquí para las otras propiedades de la receta
      });

      //La lista de ingredientes vacias:
      this.ingredientes = [];

    }else{
      this.recetasIngredientesService.getByReceta(data.receta.id).subscribe(data => {
        this.ingredientes = data;
        this.ingredientes = this.ingredientes.map((item: RecetasAlimentosVO) => {
          return {...item, editando: false};
        });
      });
      
      // Si se edita un registro se crea un formulario con los datos del registro.
      this.form = this.fb.group({
        id: [data.receta.id, Validators.required], 
        nombrePlato: [data.receta.nombrePlato, Validators.required],
        descripcion: [data.receta.descripcion, Validators.required],
        kilocalorias: [data.receta.kilocalorias, Validators.required],
        tipoAlimentacion: [data.receta.tipoAlimentacion, Validators.required],
        imagen: [data.receta.imagen]
        // Agrega más controles aquí para las otras propiedades de la receta
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.recetasService.save(this.form.value).subscribe(data => {
        this.dialogRef.close(this.form.value);
        this.snackbarService.openSnackBar('Guardado correctamente');
      });
    }
  }


borrarIngrediente(ingrediente: any): void {
  console.log(ingrediente);  
  this.recetasIngredientesService.delete(ingrediente).subscribe(data => {
    this.recetasIngredientesService.getByReceta(ingrediente.idReceta).subscribe(data => {
      this.ingredientes = data;
      this.ingredientes = this.ingredientes.map((item: RecetasAlimentosVO) => {
        return {...item, editando: false};
      });
    });
    this.tabla.renderRows();
  });
}

guardarIngrediente(ingrediente: any):void{
  this.recetasIngredientesService.save(ingrediente).subscribe(data => {
    ingrediente.editando = false;
  });
}

cancelarCambio(ingrediente: any){
  ingrediente.editando = false;
}

agregarIngrediente() {
  // Crea un nuevo objeto ingrediente
  const nuevoIngrediente = {
    idReceta: this.form.value.id,
    idAlimento: '', // o cualquier valor por defecto que desees
    cantidad: 0, // o cualquier valor por defecto que desees
    editando: true
  };

  // Agrega el nuevo ingrediente al array de ingredientes
  this.ingredientes.push(nuevoIngrediente);

  this.tabla.renderRows();
}

}
