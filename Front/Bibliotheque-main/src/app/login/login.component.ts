import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appComponent: AppComponent,private router :  Router,private fb :  FormBuilder, private accountService : AccountService) { }

  ngOnInit(): void {
  }

  public control :string = "";

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login(){
    this.accountService.login(this.loginForm.value).subscribe(
      ((data : any) => {

        this.accountService.getLogged(this.loginForm.value.username).subscribe(
          ((data:any)=>{
            localStorage.setItem("currentUser" , JSON.stringify(data));
            this.router.navigate(["/home"]);
            this.appComponent.setLogged(true);
            if(data.superUser == 1){
              this.appComponent.setSuperAdmin(true);
            }
          })
        )

      }), (error => {
        if(error.status == 403){
          this.control = "Bad credentials";
        }

    })
    )

  }

}
