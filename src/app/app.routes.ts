import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';

export const routes: Routes = [
    { path:"", redirectTo:"login", pathMatch:"full" },
    { path:"login", component:LoginComponent },
    { path:"home", component:HomeComponent, canActivate: [authGuard] },
    { path:"quien-soy", component:QuienSoyComponent },
    { path:"registro", component:RegisterComponent},
    { path:"juegos/ahorcado", component:AhorcadoComponent},
];
