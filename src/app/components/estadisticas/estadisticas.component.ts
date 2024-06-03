import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { single } from './data';
import { multi } from './dataImc';
import { grupoMuscular } from './dataGrupoMuscular';
import { EjercicioEstadoService } from '../../services/ejercicio-estado.service';
import { GrupoMuscularUsuarioService } from 'src/app/services/grupo-muscular-usuario.service';
import { UsuarioImcService } from '../../services/usuario-imc.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  tipoGrafico: string = 'resumen';

  single: any[] = single;
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: 'miEsquema',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  // IMC - Historico
  multi: any[] = multi;
  viewImc: any[] = [700, 300];

  // options
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  yAxisLabel: string = 'IMC';
  timeline: boolean = true;

  colorSchemeImc = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: 'miEsquema',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  //Grafico Grupo Muscular
  grupoMuscular: any[] = grupoMuscular;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegendGM = true;
  showXAxisLabelGM = true;
  xAxisLabelGM = 'Grupo Muscular';
  showYAxisLabelGM = true;
  yAxisLabelGM = 'Numero de ejercicios';

  colorSchemeGM = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'miEsquema',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  constructor(private ejercicioEstadoService: EjercicioEstadoService, 
              private grupoMuscularUsuarioService: GrupoMuscularUsuarioService,
              private usuarioImcService: UsuarioImcService) {
    ejercicioEstadoService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      this.single = data;
    });

    grupoMuscularUsuarioService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      this.grupoMuscular = this.transformData(data as any[]);
    });

    usuarioImcService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
     this.multi = [
          {
            name: sessionStorage.getItem('nombre'),
            series: this.transformDataMulti(data as any[])
          }
        ];
    });

    

    Object.assign(this, { single });
    Object.assign(this, { multi });
  }

  private transformData(data: any[]): any[] {

    // Mapea los datos a la nueva estructura
    const transformedData = data.map(item => ({
      name: item.grupo,
      value: item.contador,
    }));
  
    return transformedData;
  }

  private transformDataMulti(data: any[]): any[] {

    // Mapea los datos a la nueva estructura
    const transformedData = data.map(item => ({
      name: item.name,
      value: item.imc
    }));
  
    return transformedData;
  }


}
