import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosUsuariosComponent } from './mantenimientos-usuarios.component';

describe('MantenimientosUsuariosComponent', () => {
  let component: MantenimientosUsuariosComponent;
  let fixture: ComponentFixture<MantenimientosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientosUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
