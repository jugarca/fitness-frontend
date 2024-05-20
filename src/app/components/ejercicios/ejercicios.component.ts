import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EjercicioUsuarioVO } from 'src/app/interfaces/ejercicio-usuarios';
import { EjerciciosUsuariosService } from 'src/app/services/ejercicios-usuario.service';
import { ModalEjercicioComponent } from './modal-ejercicio/modal-ejercicio.component';
import { ModalEstadoEjercicioComponent } from './modal-estado-ejercicio/modal-estado-ejercicio.component';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent {

  ejerciciosUsuarioArray: EjercicioUsuarioVO[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nombreEntrenamiento', 'ejercicioId', 'duracion', 'fechaRealizacion', 'material', 'estado','imagen', 'acciones'];
  dataSource = new MatTableDataSource(this.ejerciciosUsuarioArray);

  constructor(public ejerciciosUsuarioService: EjerciciosUsuariosService, public dialog: MatDialog, private router: Router) {
    this.refreshTable();
  }

  verEjercicio(element: EjercicioUsuarioVO) {
    console.log(element);
      const dialogRef = this.dialog.open(ModalEjercicioComponent, {
        width: '50%',
        data: {ejercicio: element}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo fue cerrado');
      });
    
  }

  cambiarEstado(element: EjercicioUsuarioVO) {
    console.log(element);
      const dialogRef = this.dialog.open(ModalEstadoEjercicioComponent, {
        width: '50%',
        data: {ejercicio: element}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo fue cerrado');
        this.refreshTable();
      });
    
  }

  private refreshTable() {
    this.ejerciciosUsuarioService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      console.log(data);
      this.ejerciciosUsuarioArray = data;
      this.dataSource = new MatTableDataSource(this.ejerciciosUsuarioArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}