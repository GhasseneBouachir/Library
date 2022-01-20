export class Account {
    id: Number;
    username : String;
    email : String;
    password : String;
    firstName: String;
    lastName: String;
    phoneNumber: String;
    superUser: number;
    constructor(username : String, mail : String, password : String, firstName: String, lastName: String, phone: string,superUser : number)
    {
      this.firstName=firstName;
      this.lastName=lastName;
      this.email=mail;
      this.password= password;
      this.username=username;
      this.phoneNumber=phone;
      this.superUser=superUser;
    }
  }
