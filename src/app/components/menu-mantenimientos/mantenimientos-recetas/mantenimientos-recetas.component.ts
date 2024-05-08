import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditRecetaComponent } from './edit-receta/edit-receta.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mantenimientos-recetas',
  templateUrl: './mantenimientos-recetas.component.html',
  styleUrls: ['./mantenimientos-recetas.component.css']
})
export class MantenimientosRecetasComponent {

  

  displayedColumns: string[] = ['id', 'nombrePlato', 'descripcion', 'kilocalorias', 'tipoAlimentacion', 'acciones'];
  
  recetasArray = [];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
showSearch = false;
searchValue: string | undefined;
recetas = new MatTableDataSource(this.recetasArray); // Asegúrate de reemplazar RECETAS_ARRAY con tu array de recetas

constructor(public dialog: MatDialog, public dialogService: DialogService, private recetasService: RecetasService) {
  this.refreshTable();
}

applyFilter(filterValue: string) {
  this.recetas.filter = filterValue.trim().toLowerCase();
}

abrirModal(): void {
  this.dialog.open(EditRecetaComponent);
}

addRecord() {
  // Aquí va tu código para añadir un nuevo registro
}

openEditDialog(receta: any) {
  const dialogRef = this.dialog.open(EditRecetaComponent, {
    width: '50%',
    data: {receta: receta}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo fue cerrado');
    // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar la receta)
    this.refreshTable();
  });
}

confirmarBorrado(receta: any){
  this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
    if (res) {
      // El usuario hizo clic en Aceptar
      this.recetasService.delete(receta.id).subscribe(data => {
        this.refreshTable();
      });
    }
  });
}

private refreshTable() {
  this.recetasService.getRecetas().subscribe(data => {
    this.recetasArray = data;
    this.recetas = new MatTableDataSource(this.recetasArray);
    this.recetas.sort = this.sort;
    this.recetas.paginator = this.paginator;
  });
}

}
