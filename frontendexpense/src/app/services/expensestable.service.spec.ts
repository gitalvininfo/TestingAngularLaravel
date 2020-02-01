import { TestBed, async, inject } from '@angular/core/testing';

import { ExpensestableService } from './expensestable.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('ExpensestableService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	providers: [ExpensestableService],
  	imports: [HttpClientTestingModule]
  }));

  it('Expense table service should be created', async(() => {
    const service: ExpensestableService = TestBed.get(ExpensestableService);
    expect(service).toBeTruthy();
  }));

  it('should have retrieve function', inject([ExpensestableService], (service: ExpensestableService) => {
  	expect(service.getExpenses).toBeTruthy();
  }))

    it('should not be null', inject([ExpensestableService], (service: ExpensestableService) => {
  	expect(service.getExpenses).not.toBeNull();
  }))

    it('should have add function', inject([ExpensestableService], (service: ExpensestableService) => {
  	expect(service.storeExpense).toBeTruthy();
  }))

        it('should have add function', inject([ExpensestableService], (service: ExpensestableService) => {
  	expect(service.storeExpense).toBeTruthy();
  }))
});
