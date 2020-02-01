import { Expense } from './../../model/expense.model';
import { Component, OnInit } from '@angular/core';
import { ExpensestableService } from '../../services/expensestable.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ModalAddExpenseComponent } from '../modal-add-expense/modal-add-expense.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expensestable',
  templateUrl: './expensestable.component.html',
  styleUrls: ['./expensestable.component.css']
})
export class ExpensestableComponent implements OnInit {

  expense_list: Expense[]; // to store all students in array
  loading: boolean;
  expense: Expense
  sendValue: string = 'Test'
  coins: any;

  constructor(private router: Router, private expensesServices: ExpensestableService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getExpensesList();
    let user: any = JSON.stringify(localStorage.getItem("token"));
    // console.log('Fuck', user);
    this.getCrypto();
    setInterval(() => {
      this.getCrypto();
    }, 2000)
  }

  getCrypto() {
    this.expensesServices.getCrypto().subscribe(res => {
      this.coins = res;
      console.log('coins', this.coins)
    })
  }

  //get expenses list
  getExpensesList() {
    this.loading = true;
    this.expensesServices.getExpenses().subscribe(res => {
      this.expense_list = res;
      // console.log('Expense List', this.expense_list);
      this.loading = false;
    })
  }

  //open add expense dialog
  addExpenseDialog(): void {
    const dialogRef = this.dialog.open(ModalAddExpenseComponent, {
      width: '500px',
      data: { id: 0, cmd: 'add', }
    });
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.autoFocus = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getExpensesList();
    });
  }

  //open add expense dialog
  updateExpense(expense) {
    this.expensesServices.showExpense(expense.id).then(res => {
      this.expense = res;
      console.log(this.expense.id)
      const dialogRef = this.dialog.open(ModalAddExpenseComponent, {
        width: '500px',
        data: { id: this.expense.id, cmd: 'update', data: this.expense }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.getExpensesList();
      });
    })
  }

  //delete specific expense
  deleteExpense(expense) {
    const index: number = this.expense_list.indexOf(expense);
    if (index !== -1) {
      this.expense_list.splice(index, 1);
    }
    this.expensesServices.deleteExpense(expense.id).then(res => {
      // this.getExpensesList();
      console.log('Delete id', expense.id)
    })
  }




}
