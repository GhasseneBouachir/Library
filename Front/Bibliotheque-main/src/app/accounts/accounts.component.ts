import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';
import {Student} from "../models/Student";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  formType : string;
  public  msgBtn: string = "Add Account";
  x = false;
  accounts: Account [] = [];
  public account : Account;

  addForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber : ['', Validators.required],
    superUser: ['', ]
  });

  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }


  OnCreate() : void{

    this.addForm.controls['username'].setValue("");
    this.addForm.controls['email'].setValue("");
    this.addForm.controls['password'].setValue("");
     this.addForm.controls['firstName'].setValue("");
    this.addForm.controls['lastName'].setValue("");
    this.addForm.controls['phoneNumber'].setValue("");
    this.addForm.controls['superUser'].setValue("");

    this.formType = "add";

    this.x = !this.x;
    if (this.x) {
      this.msgBtn = "Cancel";
    }
    else
      this.msgBtn = "Add Account";
  }

  addAccount(): void {
    this.x = false;
    this.msgBtn = "Add Account";

    if(this.formType == "add") {
      const account = new Account(this.addForm.value.username, this.addForm.value.email, this.addForm.value.password,
        this.addForm.value.firstName, this.addForm.value.lastName,this.addForm.value.phoneNumber,
        this.addForm.value.superUser == ""||this.addForm.value.superUser == false ? 0 : 1);
        console.log(account)
      this.accountService.create(account)
        .subscribe(
          response => {
            console.log(response);
            this.accounts = this.accountService.getAccounts();
          },
          error => {
            console.log(error);
          });
    }
      else {
      this.account.firstName = this.addForm.value.firstName;
      this.account.lastName = this.addForm.value.lastName;
      this.account.phoneNumber = this.addForm.value.phoneNumber;
      this.account.username = this.addForm.value.username;
      this.account.email = this.addForm.value.email;
      this.account.password = this.addForm.value.password;

      this.accountService.update(this.account).subscribe(
        response =>{
          this.msgBtn = "Add Student";
          this.accounts = this.accountService.getAccounts();
          this.msgBtn = "Add Account";
        },
        error =>{
          console.log(error);
        }
      );
    }
  }
  OnUpdate(n: Account)
  {
    this.x = true;
    this.account = n;
    this.addForm.controls['firstName'].setValue(this.account.firstName);
    this.addForm.controls['lastName'].setValue(this.account.lastName);
    this.addForm.controls['phoneNumber'].setValue(this.account.phoneNumber);
    this.addForm.controls['username'].setValue(this.account.username);
    this.addForm.controls['email'].setValue(this.account.email);
    this.addForm.controls['password'].setValue(this.account.password);
    this.formType = "update";
    if (this.x)
      this.msgBtn = "Cancel";
  }
  OnDelete(n: Account){
    if(window.confirm("Confirm Delete")){
      this.accountService.delete(n.id).subscribe(
        (data =>{
          this.accounts = this.accountService.getAccounts();
        })
      )
    }
  }

}
