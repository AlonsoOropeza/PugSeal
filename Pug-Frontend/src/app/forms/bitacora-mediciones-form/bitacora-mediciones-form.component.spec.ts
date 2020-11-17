import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraMedicionesFormComponent } from './bitacora-mediciones-form.component';

describe('BitacoraMedicionesFormComponent', () => {
  let component: BitacoraMedicionesFormComponent;
  let fixture: ComponentFixture<BitacoraMedicionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraMedicionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraMedicionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
