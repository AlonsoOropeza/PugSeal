import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarMantCorFormComponent } from './calificar-mant-cor-form.component';

describe('CalificarMantCorFormComponent', () => {
  let component: CalificarMantCorFormComponent;
  let fixture: ComponentFixture<CalificarMantCorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificarMantCorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarMantCorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
