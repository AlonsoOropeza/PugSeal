import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraMedicionesComponent } from './bitacora-mediciones.component';

describe('BitacoraMedicionesComponent', () => {
  let component: BitacoraMedicionesComponent;
  let fixture: ComponentFixture<BitacoraMedicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraMedicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraMedicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
