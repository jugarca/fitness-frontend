import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { ParametrosService } from '../../../services/parametros.service';
import { ValoresTipoVO } from '../../../interfaces/valoresTipos.interface';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';

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
  public niveles: ValoresTipoVO[]= [];
  public tiempos: ValoresTipoVO[]= [];
  public objetivos: ValoresTipoVO[]= [];
  public grupoMuscular: ValoresTipoVO[]= [];
  public tiposAlimentacion: ValoresTipoVO[] = [];
  public sexos: ValoresTipoVO[] = [];

  //Esto es una prueba de concepto de autocomplete con chips
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredMateriales!: Observable<string[]>;
  //TODO: Aqui se marcaran los que vienen de Base de datos.
  materiales: string[] = [];
  allMaterials: string[] = ['Mancuernas', 'Comba', 'Cintas', 'Pesas Rusas', 'Barra'];
  materialCtrl = new FormControl('');
  @ViewChild('materialInput') materialInput: ElementRef<HTMLInputElement> | undefined;

  //Para el autocomplete de dias
  filteredDias!: Observable<string[]>;
  //TODO: Aqui se marcaran los que vienen de Base de datos.
  dias: string[] = [];
  allDias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  diaCtrl = new FormControl('');
  @ViewChild('diaInput') diaInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private _formBuilder: FormBuilder, private parametrosService: ParametrosService,
    private usuariosService: UsuariosService, private router: Router) {
    this.primerFormGroup = this._formBuilder.group({
      altura: ['', [Validators.required, Validators.max(300)]],
      peso: ['', [Validators.required, Validators.max(350)]],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      nivel: [''],
      tiempo: [''],
      objetivo: [''],
      grupoMuscular: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });

    this.parametrosService.getByTipo('MATERIAL').subscribe(data => {
      this.allMaterials = data.map((data: { codigo: any, descripcion: any }) => data.codigo.toString() + " - " + data.descripcion);

      this.filteredMateriales = this.segundoFormGroup.valueChanges.pipe(
        startWith(null),
        map((material: string | null) => (material ? this._filter(material) : this.allMaterials.slice())),
      );
    });

    this.parametrosService.getByTipo('DIAS').subscribe(data => {
      this.allDias = data.map((data: { codigo: any }) => data.codigo);

      this.filteredDias = this.tercerFormGroup.valueChanges.pipe(
        startWith(null),
        map((dia: string | null) => (dia ? this._filterDia(dia) : this.allDias.slice())),
      );
    });

    this.parametrosService.getByTipo('NIVEL').subscribe(data => {
      this.niveles = data;
    });

    this.parametrosService.getByTipo('SEXO').subscribe(data => {
      this.sexos = data;
    });

    this.parametrosService.getByTipo('TIEMPO').subscribe(data => {
      this.tiempos = data;
    });

    this.parametrosService.getByTipo('OBJETIVO').subscribe(data => {
      this.objetivos = data;
    });

    this.parametrosService.getByTipo('GRUPMUS').subscribe(data => {
      this.grupoMuscular = data;
    });

    this.parametrosService.getByTipo('TALIME').subscribe(data => {
      this.tiposAlimentacion = data;
    });


    this.segundoFormGroup = this._formBuilder.group({
      materialDisponible: ['']
    })

    this.tercerFormGroup = this._formBuilder.group({
      diasSemana: [''],
    })

    this.cuartoFormGroup = this._formBuilder.group({
      planAlimentacion: [false],
      kilocaloriasMaximas: ['', Validators.required],
      tipoAlimentacion: ['', Validators.required],
      // Agrega más controles aquí
    });

  }

  /* Metodos para crear los Autocomplete */
  addMaterial(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.materiales.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.materialCtrl.setValue(null);
  }

  removeMaterial(fruit: string): void {
    const index = this.materiales.indexOf(fruit);

    if (index >= 0) {
      this.materiales.splice(index, 1);
    }
  }

  selectedMaterial(event: MatAutocompleteSelectedEvent): void {
    this.materiales.push(event.option.viewValue);
    if (this.materialInput) {
      this.materialInput.nativeElement.value = '';
    }
    this.materialCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMaterials.filter(material => material.toLowerCase().includes(filterValue));
  }

  //Metodo AutoComplete Días.
  addDia(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.dias.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.diaCtrl.setValue(null);
  }

  removeDia(dia: string): void {
    const index = this.dias.indexOf(dia);

    if (index >= 0) {
      this.dias.splice(index, 1);
    }
  }

  selectedDia(event: MatAutocompleteSelectedEvent): void {
    this.dias.push(event.option.viewValue);
    if (this.diaInput) {
      this.diaInput.nativeElement.value = '';
    }
    this.diaCtrl.setValue(null);
  }

  private _filterDia(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allDias.filter(dia => dia.toLowerCase().includes(filterValue));
  }

  onSave() {
    const datos = {
      idUser: sessionStorage.getItem('id'),
      ...this.primerFormGroup.value,
      ...this.segundoFormGroup.value,
      ...this.tercerFormGroup.value,
      ...this.cuartoFormGroup.value
    };

    datos.diasSemana = this.dias;
    datos.materialDisponible = this.materiales;

    
    // Ahora puedes enviar `datos` a tu método en Java...
    console.log(datos);
    this.usuariosService.plan(datos).subscribe(data => {
      this.router.navigate(['/planEntrenamiento']);
    });
    
  }


}
