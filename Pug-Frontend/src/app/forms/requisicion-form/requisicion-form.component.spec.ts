import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionFormComponent } from './requisicion-form.component';

describe('RequisicionFormComponent', () => {
  let component: RequisicionFormComponent;
  let fixture: ComponentFixture<RequisicionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
