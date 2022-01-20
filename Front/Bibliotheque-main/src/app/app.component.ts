import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bibFront';

  public logged : boolean = false;
  public superAdmin : boolean = false;

  constructor(private  router  : Router) {
    if (localStorage.getItem("currentUser")){
      this.superAdmin = JSON.parse(localStorage.getItem("currentUser")).superUser == 1;
      this.setLogged(true);
    }
  }

  setLogged(value : boolean){
    this.logged = value;
  }
  setSuperAdmin(value : boolean){
    this.superAdmin = value;
  }

  logout(){
    if(window.confirm("Log out ?")){
      localStorage.removeItem("currentUser");
      this.setLogged(false);
      this.setSuperAdmin(false);
      this.router.navigate(["/home"]);
    }
  }
}
