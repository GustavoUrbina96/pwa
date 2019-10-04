import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard }  from './auth/auth.guard';
import { AddUserComponent } from "./users/add-user/add-user.component";
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./users/users.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "user", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "user-details/:userId", component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: "add-user", component: AddUserComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
