import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from "../../shared/models/user";
import { Router } from "@angular/router";
import { TokenService } from "../../shared/services/token/token.service";
import { UsersService } from "../../shared/services/users/users.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html"
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  modalRef: BsModalRef;
  template: TemplateRef<any>;
  newUser: User;
  userAdded: boolean;


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UsersService,
    private modalService: BsModalService,
    private _tokenService: TokenService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.userAdded = false;
    this.addUserForm = this._formBuilder.group({
      last_name: ["", [Validators.required, Validators.minLength(3)]],
      first_name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.minLength(10), Validators.email]]
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.newUser = {
        first_name: this.addUserForm.get("first_name").value,
        last_name: this.addUserForm.get("last_name").value,
        avatar: 'https://image.flaticon.com/icons/svg/17/17004.svg',
        id: Math.floor(Math.random() * 100) + 1,
        email: this.addUserForm.get("email").value

      };
      this._userService.postNewUser(this.newUser).subscribe(response => {
        console.log(response);
        this.userAdded = true;
      });
    } else {
      alert("Introduce todos los campos para continuar");
    }

  }

  openModal(template: TemplateRef<any>) {
    if (this.userAdded)
      this.modalRef = this.modalService.show(template);
  }

  singOut() {
    this._tokenService.logOutToken();
    this._router.navigateByUrl("");
  }
}
