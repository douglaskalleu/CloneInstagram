import { Routes } from "@angular/router";
import { AcessoComponent } from "./acesso/acesso.component";
import { HomeComponent } from "./home/home.component";
import { GuardAuth } from "./guard-auth.service";

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [ GuardAuth ] }
]