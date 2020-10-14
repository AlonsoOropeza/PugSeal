import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPreventivoFormComponent } from './mantenimiento-preventivo-form.component';

describe('MantenimientoPreventivoFormComponent', () => {
  let component: MantenimientoPreventivoFormComponent;
  let fixture: ComponentFixture<MantenimientoPreventivoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPreventivoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPreventivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
