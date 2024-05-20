import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RecetaDialogComponent } from './receta-dialog-component';
import { UsuarioMenuService } from '../../services/usuario-menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuariosMenuVO } from '../../interfaces/usuario-menu.interface';
import { ModalRecetaUsuarioComponent } from './modal-receta-usuario/modal-receta-usuario.component';

@Component({
  selector: 'app-recetas-usuario',
  templateUrl: './recetas-usuario.component.html',
  styleUrls: ['./recetas-usuario.component.css']
})
export class RecetasUsuarioComponent {

  usuarioMenuVOArray: UsuariosMenuVO[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nombreReceta', 'kilocalorias', 'tipoAlimentacion', 'fecha', 'horario', 'acciones'];
  dataSource = new MatTableDataSource<UsuariosMenuVO>(this.usuarioMenuVOArray);

  constructor(public dialog: MatDialog, private usuarioMenuService :UsuarioMenuService) {
    this.usuarioMenuService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      this.usuarioMenuVOArray = data;
      this.dataSource = new MatTableDataSource<UsuariosMenuVO>(this.usuarioMenuVOArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  verReceta(element: any) {
    // Aquí puedes definir lo que sucede cuando se hace clic en el botón de ver receta
    const dialogRef = this.dialog.open(ModalRecetaUsuarioComponent, {
      width: '50%',
      data: {receta: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

}

