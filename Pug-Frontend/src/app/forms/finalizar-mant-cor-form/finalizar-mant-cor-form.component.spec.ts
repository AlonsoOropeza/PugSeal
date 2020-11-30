import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarMantCorFormComponent } from './finalizar-mant-cor-form.component';

describe('FinalizarMantCorFormComponent', () => {
  let component: FinalizarMantCorFormComponent;
  let fixture: ComponentFixture<FinalizarMantCorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarMantCorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarMantCorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
