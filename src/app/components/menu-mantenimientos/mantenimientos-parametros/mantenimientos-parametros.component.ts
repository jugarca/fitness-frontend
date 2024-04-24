import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditParametroComponent } from './edit-parametro/edit-parametro.component';

@Component({
  selector: 'app-mantenimientos-parametros',
  templateUrl: './mantenimientos-parametros.component.html',
  styleUrls: ['./mantenimientos-parametros.component.css']
})
export class MantenimientosParametrosComponent {
  parametrosArray = [
    { tipo: 'Estado', codigo: 'A', descripcion: 'Abierto', descripcionValenciano: 'Obert', activo: true },
    { tipo: 'Estado', codigo: 'C', descripcion: 'Cerrado', descripcionValenciano: 'Tancat', activo: false },
    { tipo: 'Tipo de Alimentacion', codigo: 'V', descripcion: 'Vegana', descripcionValenciano: 'Vegana', activo: true },
    { tipo: 'Tipo de Alimentacion', codigo: 'P', descripcion: 'Proteica', descripcionValenciano: 'Proteica', activo: true },
    { tipo: 'Tipo de Alimentacion', codigo: 'D', descripcion: 'Dieta', descripcionValenciano: 'Dieta', activo: true },
  ];

  displayedColumns: string[] = ['tipo','codigo', 'descripcion', 'descripcionValenciano', 'activo', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  parametros = new MatTableDataSource(this.parametrosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  applyFilter(filterValue: string) {
    this.parametros.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    this.dialog.open(EditParametroComponent);
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(parametro: any) {
    const dialogRef = this.dialog.open(EditParametroComponent, {
      width: '50%',
      data: {parametro: parametro}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar el ejercicio)
    });
  }

  confirmarBorrado(){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      if (res) {
        // El usuario hizo clic en Aceptar
        alert('Borrado Correctamente');
      } else {
        // El usuario hizo clic en Cancelar
        alert('Cancelado');
      }
    });
  }
}
