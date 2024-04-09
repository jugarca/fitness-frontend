import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosEjerciciosComponent } from './mantenimientos-ejercicios.component';

describe('MantenimientosEjerciciosComponent', () => {
  let component: MantenimientosEjerciciosComponent;
  let fixture: ComponentFixture<MantenimientosEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientosEjerciciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientosEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
