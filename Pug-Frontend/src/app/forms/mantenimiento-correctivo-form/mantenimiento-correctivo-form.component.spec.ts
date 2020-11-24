import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCorrectivoFormComponent } from './mantenimiento-correctivo-form.component';

describe('MantenimientoCorrectivoFormComponent', () => {
  let component: MantenimientoCorrectivoFormComponent;
  let fixture: ComponentFixture<MantenimientoCorrectivoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoCorrectivoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCorrectivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
