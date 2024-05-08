import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ParametrosService } from 'src/app/services/parametros.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { RecetasIngredientesService } from '../../../../services/recetas-ingredientes.service';
import { RecetasAlimentosVO } from 'src/app/interfaces/recetas-ingredientes.interface';
import { ValoresTipoVO } from 'src/app/interfaces/valoresTipos.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.recetasIngredientesService.getByReceta(data.receta.id).subscribe(data => {
      console.log(data);
      this.ingredientes = data;
      this.ingredientes = this.ingredientes.map((item: RecetasAlimentosVO) => {
        return {...item, editando: false};
      });
      console.log(this.ingredientes);
    });

    this.parametrosService.getByTipo('INGREDIENTE').subscribe(data => {
      console.log(data);
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
        // Agrega más controles aquí para las otras propiedades de la receta
      });

      //La lista de ingredientes vacias:
      this.ingredientes = [];

    }else{
      // Si se edita un registro se crea un formulario con los datos del registro.
      this.form = this.fb.group({
        id: [data.receta.id, Validators.required], 
        nombrePlato: [data.receta.nombrePlato, Validators.required],
        descripcion: [data.receta.descripcion, Validators.required],
        kilocalorias: [data.receta.kilocalorias, Validators.required],
        tipoAlimentacion: [data.receta.tipoAlimentacion, Validators.required],
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
        console.log(data);
        this.dialogRef.close(this.form.value);
      });
    }
  }

//Agregar los metodos relacionados con la tabla de ingredientes

editarIngrediente(idIngrediente: number): void {
  // Aquí puedes agregar el código para editar el ingrediente
}

borrarIngrediente(idIngrediente: number): void {
  console.log(idIngrediente);  
}

guardarIngrediente(ingrediente: any):void{
  console.log(ingrediente);
}

cancelarCambio(){
}

agregarIngrediente() {

  this.tabla.renderRows();
}

}
