import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-plan-entrenamiento-editar',
  templateUrl: './plan-entrenamiento-editar.component.html',
  styleUrls: ['./plan-entrenamiento-editar.component.css'],
})
export class PlanEntrenamientoEditarComponent{

  public primerFormGroup: FormGroup;
  public segundoFormGroup: FormGroup;
  public tercerFormGroup: FormGroup;
  public cuartoFormGroup: FormGroup;

  materials: string[] = ['Pesas'];
  
  //TODO: Cargarlo en el constructor desde Base de datos.
  public niveles = ['nivel basico', 'nivel intermedio', 'nivel avanzado', 'elite'];
  public tiempos = ['15 minutos', '30 minutos', '45 minutos', '60 minutos', '75 minutos', '90 minutos'];
  public objetivos = ['Perdida de grasa', 'Aumento Muscular', 'Resistencia', 'Mantenimiento'];
  public grupoMuscular = ['Todo', 'Core', 'Brazos', 'Hombros','Pecho','Espalda','Pierna','Tren Superior','Tren Inferior'];

  constructor(private _formBuilder: FormBuilder) {
    this.primerFormGroup = this._formBuilder.group({
      altura: ['', [Validators.required, Validators.max(300)]],
      peso: ['', [Validators.required, Validators.max(350)]],
      nivel: [''],
      tiempo: [''],
      objetivo: [''],
      grupoMuscular: ['']
      // Agrega más controles aquí
    });

    this.segundoFormGroup = this._formBuilder.group({
      materialDisponible: ['']
    })

    this.tercerFormGroup = this._formBuilder.group({
      diasSemana: ['']
    })

    this.cuartoFormGroup = this._formBuilder.group({
      kilocaloriasMaximas: ['', Validators.required],
      tipoAlimentacion: ['', Validators.required],
      // Agrega más controles aquí
    });
  }

  /* Metodos para crear los Autocomplete */
  remove(material: string): void {
    const index = this.materials.indexOf(material);

    if (index >= 0) {
      this.materials.splice(index, 1);
    }
  }


}
