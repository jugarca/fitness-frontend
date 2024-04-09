import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosTiposComponent } from './mantenimientos-tipos.component';

describe('MantenimientosTiposComponent', () => {
  let component: MantenimientosTiposComponent;
  let fixture: ComponentFixture<MantenimientosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientosTiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
