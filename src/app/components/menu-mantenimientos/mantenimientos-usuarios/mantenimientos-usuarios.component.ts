import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposVO } from '../../../interfaces/tipos.interface';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-mantenimientos-usuarios',
  templateUrl: './mantenimientos-usuarios.component.html',
  styleUrls: ['./mantenimientos-usuarios.component.css']
})
export class MantenimientosUsuariosComponent {
  usuariosArray = [];


  displayedColumns: string[] = ['id', 'nombre', 'email', 'role', 'edad', 'altura', 'peso', 'nivelPersonalizado', 'tiempoEntrenamiento', 'objetivoEntrenamiento', 'acciones'];


  showSearch = false;
  searchValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuarios = new MatTableDataSource(this.usuariosArray);

  constructor(public dialog: MatDialog, public dialogService: DialogService, 
              private usuariosService: UsuariosService) {
    this.refreshTable();
  }

  applyFilter(filterValue: string) {
    this.usuarios.filter = filterValue.trim().toLowerCase();
  }

  abrirModal(): void {
    this.dialog.open(EditUsuarioComponent);
  }

  addRecord() {
    // Aquí va tu código para añadir un nuevo registro
  }

  openEditDialog(usuario: any) {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '50%',
      data: {usuario: usuario}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Aquí puedes manejar el resultado del diálogo (por ejemplo, actualizar el ejercicio)
      this.refreshTable();
    });
  }

  confirmarBorrado(usuario: any){
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres borrar el registro?').afterClosed().subscribe(res => {
      console.log(usuario);
      console.log(res);
      if (res) {
        // El usuario hizo clic en Aceptar
        this.usuariosService.delete(usuario.id).subscribe(data => {
          this.refreshTable();
        });
      } 
    });
  }

  private refreshTable() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuariosArray = data;
      console.log(this.usuariosArray);
      this.usuarios = new MatTableDataSource(this.usuariosArray);
      this.usuarios.sort = this.sort;
      this.usuarios.paginator = this.paginator;
    });

  }
}
