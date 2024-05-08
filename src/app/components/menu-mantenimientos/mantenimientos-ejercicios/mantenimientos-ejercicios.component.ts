import { Component, ViewChild } from '@angular/core';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { EjercicioVO } from 'src/app/interfaces/ejercicio.interface';

@Component({
  selector: 'app-mantenimientos-ejercicios',
  templateUrl: './mantenimientos-ejercicios.component.html',
  styleUrls: ['./mantenimientos-ejercicios.component.css']
})
export class MantenimientosEjerciciosComponent {
  
  displayedColumns: string[] = ['id', 'nombre', 'objetivo', 'nivel', 'duracion', 'grupoMuscular', 'deporte', 'material', 'acciones'];
  
  ejerciciosArray = [];

  showSearch = false;
  searchValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ejercicios = new MatTableDataSource(this.ejerciciosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService,
              private ejercicioService: EjerciciosService) {
                this.refreshTable();
              }

  applyFilter(filterValue: string) {
    this.ejercicios.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(EditEjercicioComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(ejercicio: any) {
    const dialogRef = this.dialog.open(EditEjercicioComponent, {
      width: '50%',
      data: {ejercicio: ejercicio}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  confirmarBorrado(ejercicio: EjercicioVO){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      if (res) {
        this.ejercicioService.delete(ejercicio.id).subscribe(data => {
          this.refreshTable();
        });
      } else {
        // El usuario hizo clic en Cancelar
        alert('Cancelado');
      }
    });
  }

  private refreshTable() {
    this.ejercicioService.getEjercicios().subscribe(data => {
      this.ejerciciosArray = data;
      this.ejercicios = new MatTableDataSource(this.ejerciciosArray);
      this.ejercicios.sort = this.sort;
      this.ejercicios.paginator = this.paginator;
    });

  }
}
