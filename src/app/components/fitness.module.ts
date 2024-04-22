import { NgModule } from "@angular/core";
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { MaterialModule } from "../material.module";
import { CalendarioComponent } from './calendario/calendario.component';
import { RouterModule } from "@angular/router";
import { TranslocoRootModule } from "../transloco-root.module";
import { PlanEntrenamientoComponent } from './plan-entrenamiento/plan-entrenamiento.component';
import { PlanEntrenamientoEditarComponent } from './plan-entrenamiento/plan-entrenamiento-editar/plan-entrenamiento-editar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecetasUsuarioComponent } from './recetas-usuario/recetas-usuario.component';
import { RecetaDialogComponent } from "./recetas-usuario/receta-dialog-component";
import { ListaCompraComponent } from './lista-compra/lista-compra.component';
import { MenuMantenimientosComponent } from './menu-mantenimientos/menu-mantenimientos.component';
import { MantenimientosRecetasComponent } from './menu-mantenimientos/mantenimientos-recetas/mantenimientos-recetas.component';
import { MantenimientosEjerciciosComponent } from './menu-mantenimientos/mantenimientos-ejercicios/mantenimientos-ejercicios.component';
import { MantenimientosUsuariosComponent } from './menu-mantenimientos/mantenimientos-usuarios/mantenimientos-usuarios.component';
import { MantenimientosTiposComponent } from './menu-mantenimientos/mantenimientos-tipos/mantenimientos-tipos.component';
import { MantenimientosParametrosComponent } from './menu-mantenimientos/mantenimientos-parametros/mantenimientos-parametros.component';
import { EditRecetaComponent } from './menu-mantenimientos/mantenimientos-recetas/edit-receta/edit-receta.component';
import { MatDialogModule } from "@angular/material/dialog";
import { LoginComponent } from './login/login.component';
import { EditEjercicioComponent } from "./menu-mantenimientos/mantenimientos-ejercicios/edit-ejercicio/edit-ejercicio.component";

@NgModule({
    declarations: [
        RegistroUsuarioComponent,
        EjerciciosComponent,
        PantallaPrincipalComponent,
        CalendarioComponent,
        PlanEntrenamientoComponent,
        PlanEntrenamientoEditarComponent,
        RecetasUsuarioComponent,
        RecetaDialogComponent,
        ListaCompraComponent,
        MenuMantenimientosComponent,
        MantenimientosRecetasComponent,
        MantenimientosEjerciciosComponent,
        MantenimientosUsuariosComponent,
        MantenimientosTiposComponent,
        MantenimientosParametrosComponent,
        EditRecetaComponent,
        EditEjercicioComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        TranslocoRootModule,
        FormsModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: []
  })
  export class FitnessModule { }