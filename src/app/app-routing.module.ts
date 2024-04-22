import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { PantallaPrincipalComponent } from './components/pantalla-principal/pantalla-principal.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { PlanEntrenamientoComponent } from './components/plan-entrenamiento/plan-entrenamiento.component';
import { PlanEntrenamientoEditarComponent } from './components/plan-entrenamiento/plan-entrenamiento-editar/plan-entrenamiento-editar.component';
import { RecetasUsuarioComponent } from './components/recetas-usuario/recetas-usuario.component';
import { ListaCompraComponent } from './components/lista-compra/lista-compra.component';
import { MenuMantenimientosComponent } from './components/menu-mantenimientos/menu-mantenimientos.component';
import { MantenimientosRecetasComponent } from './components/menu-mantenimientos/mantenimientos-recetas/mantenimientos-recetas.component';
import { LoginComponent } from './components/login/login.component';
import { MantenimientosEjerciciosComponent } from './components/menu-mantenimientos/mantenimientos-ejercicios/mantenimientos-ejercicios.component';


const routes: Routes = [
  { path: 'pantallaPrincipal', component: PantallaPrincipalComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'ejercicios', component: EjerciciosComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'planEntrenamiento', component: PlanEntrenamientoComponent },
  { path: 'planEntrenamientoEditar', component: PlanEntrenamientoEditarComponent },
  { path: 'misRecetas', component: RecetasUsuarioComponent },
  { path: 'misListaCompra', component: ListaCompraComponent },
  { path: 'mantenimientos', component: MenuMantenimientosComponent },
  { path: 'mantenimientosRecetas', component: MantenimientosRecetasComponent },
  { path: 'mantenimientosEjercicios', component: MantenimientosEjerciciosComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
