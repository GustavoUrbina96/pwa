import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Login } from "../shared/models/login";
import { TokenService } from "../shared/services/token/token.service";
import { UsersService } from "../shared/services/users/users.service";
//import { Alert } from 'selenium-webdriver';
//import { resolve } from 'dns';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  profile: any;


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UsersService,
    private _tokenService: TokenService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.minLength(10), Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
     const loginObject: Login = {
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value
      };

      this._userService.login(loginObject).subscribe(response => {

        this._tokenService.setActiveToken(response.token);
        this._router.navigateByUrl("user");

      }, error => {
        alert("Usuario o correo incorrectos")
      });



    } else {
      alert("Favor de llenar el introducir el correo y la contraseña")
    }
  }


}
