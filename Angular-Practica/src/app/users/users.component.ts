import { Component, OnInit } from '@angular/core';
import { UsersService } from "../shared/services/users/users.service";
import { Router } from "@angular/router";
import { TokenService } from "../shared/services/token/token.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  numberPage: number = 1;
  totalPages: number = 5;
  listUsers: Array<any> ;
  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _tokenService: TokenService
  ) { 
  }

  ngOnInit() {
    this.getListUser(this.numberPage);
  }

  getListUser(page){
    this._userService.getUsers(page).subscribe(response => {
      console.log(response);
      this.listUsers = response.data;
    });
  }

  pageChanged(event: any): void {
    this.getListUser(event.page);
  }

  singOut(){
    this._tokenService.logOutToken();
    this._router.navigateByUrl("");
  }


}
