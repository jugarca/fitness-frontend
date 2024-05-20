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
import { MantenimientosUsuariosComponent } from './components/menu-mantenimientos/mantenimientos-usuarios/mantenimientos-usuarios.component';
import { MantenimientosTiposComponent } from './components/menu-mantenimientos/mantenimientos-tipos/mantenimientos-tipos.component';
import { MantenimientosParametrosComponent } from './components/menu-mantenimientos/mantenimientos-parametros/mantenimientos-parametros.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { FitnessGuard } from './fitness.guard';


const routes: Routes = [
  { path: 'pantallaPrincipal', component: PantallaPrincipalComponent, canActivate: [FitnessGuard]  },
  { path: 'registro', component: RegistroUsuarioComponent, canActivate: [FitnessGuard]  },
  { path: 'ejercicios', component: EjerciciosComponent, canActivate: [FitnessGuard]  },
  { path: 'calendario', component: CalendarioComponent, canActivate: [FitnessGuard]  },
  { path: 'planEntrenamiento', component: PlanEntrenamientoComponent, canActivate: [FitnessGuard]  },
  { path: 'planEntrenamientoEditar', component: PlanEntrenamientoEditarComponent, canActivate: [FitnessGuard]  },
  { path: 'misRecetas', component: RecetasUsuarioComponent, canActivate: [FitnessGuard]  },
  { path: 'misListaCompra', component: ListaCompraComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientos', component: MenuMantenimientosComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientosRecetas', component: MantenimientosRecetasComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientosEjercicios', component: MantenimientosEjerciciosComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientosUsuarios', component: MantenimientosUsuariosComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientosTipos', component: MantenimientosTiposComponent, canActivate: [FitnessGuard]  },
  { path: 'mantenimientosParametros', component: MantenimientosParametrosComponent, canActivate: [FitnessGuard]  },
  { path: 'usuario-perfil', component: UsuarioPerfilComponent, canActivate: [FitnessGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [FitnessGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [FitnessGuard] },
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
