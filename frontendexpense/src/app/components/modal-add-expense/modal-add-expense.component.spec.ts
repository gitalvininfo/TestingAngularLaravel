import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddExpenseComponent } from './modal-add-expense.component';

xdescribe('ModalAddExpenseComponent', () => {
  let component: ModalAddExpenseComponent;
  let fixture: ComponentFixture<ModalAddExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
