import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../model/expense.model';
import { ExpensestableService } from '../../services/expensestable.service';
@Component({
  selector: 'app-modal-add-expense',
  templateUrl: './modal-add-expense.component.html',
  styleUrls: ['./modal-add-expense.component.css']
})
export class ModalAddExpenseComponent implements OnInit {
  panelTitle: string;
  buttonTitle: string;
  addExpenseForm: FormGroup;
  isSubmitted = false;
  isUpdate: boolean;
  expense: Expense; // the model for this form

  constructor(public dialogRef: MatDialogRef<ModalAddExpenseComponent>, private formBuilder: FormBuilder, private expensesServices: ExpensestableService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isUpdate = (data.cmd == 'update') ? true : false;
  }

  openExpenseForm() {
    // if add button is click
    if (this.data.id == 0) {
      this.expense = {
        title: null,
        category: null,
        description: null,
        price: null
      };
      this.panelTitle = 'Add Expense'
      this.buttonTitle = 'Add Expense'
    }

    // if edit button is click
    else {
      this.expense = {
        title: this.data.data.title,
        category: this.data.data.category,
        description: this.data.data.description,
        price: this.data.data.price
      };
      this.panelTitle = 'Edit Expense'
      this.buttonTitle = 'Edit Expense'
    }

    console.log('>>>', this.data.id)
  }

  ngOnInit() {
    // initialize the form to null and refer to the models
    this.openExpenseForm();
    //for validators
    this.addExpenseForm = this.formBuilder.group({
      title: [this.expense.title, Validators.required],
      category: [this.expense.category, Validators.required],
      description: [this.expense.description, Validators.required],
      price: [this.expense.price, Validators.required],
    });
  }

  //getters for the add expense form for validators 
  get f() { return this.addExpenseForm.controls; }


  //submits the form
  storeExpense() {
    // stop here if form is invalid
    // if (this.addExpenseForm.invalid) {
    //   return;
    // }
    // else {
    this.isSubmitted = true;
    if (this.data.id == 0) {
      this.expensesServices.storeExpense(this.expense).then(res => {
        console.log(this.addExpenseForm.value);
        this.addExpenseForm.reset();
        this.dialogRef.close();
      })
    }
    else if (this.data.id != 0) {
      this.expensesServices.editExpense(this.data.id, this.expense).then(res => {
        console.log('Updated Value ', this.data.id);
        this.dialogRef.close();

      })
    }
    // }



  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
