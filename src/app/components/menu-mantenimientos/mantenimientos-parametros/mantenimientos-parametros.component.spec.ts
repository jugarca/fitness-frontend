import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosParametrosComponent } from './mantenimientos-parametros.component';

describe('MantenimientosParametrosComponent', () => {
  let component: MantenimientosParametrosComponent;
  let fixture: ComponentFixture<MantenimientosParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientosParametrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientosParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
