import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditTipoComponent } from './edit-tipo/edit-tipo.component';

@Component({
  selector: 'app-mantenimientos-tipos',
  templateUrl: './mantenimientos-tipos.component.html',
  styleUrls: ['./mantenimientos-tipos.component.css']
})
export class MantenimientosTiposComponent {
  tiposArray = [
    { codigo: '001', descripcion: 'Estado', descripcionValenciano: 'Estat', activo: true },
    { codigo: '002', descripcion: 'Tipo Alimentacion', descripcionValenciano: 'Tipus Alimentacion', activo: false },
    { codigo: '003', descripcion: 'Material', descripcionValenciano: 'Material', activo: true },
  ];

  displayedColumns: string[] = ['codigo', 'descripcion', 'descripcionValenciano', 'activo', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  tipos = new MatTableDataSource(this.tiposArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService) {}

  applyFilter(filterValue: string) {
    this.tipos.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    this.dialog.open(EditTipoComponent);
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(tipo: any) {
    const dialogRef = this.dialog.open(EditTipoComponent, {
      width: '50%',
      data: {tipo: tipo}
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
