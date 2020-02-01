import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensestableComponent } from './expensestable.component';

xdescribe('ExpensestableComponent', () => {
  let component: ExpensestableComponent;
  let fixture: ComponentFixture<ExpensestableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensestableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
