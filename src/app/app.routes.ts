import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path:"", redirectTo:"login", pathMatch:"full" },
    { path:"login", component:LoginComponent },
    { path:"home", component:HomeComponent, canActivate: [authGuard] },
    { 
        path:"quien-soy",
        loadChildren: () => import('../app/components/quien-soy/quien-soy.module').then(m => m.QuienSoyModule)
    },
    { path:"registro", component:RegisterComponent},
    { 
        path:"juegos/ahorcado",
        loadChildren: () => import('../app/components/juegos/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
    },
    { 
        path:"juegos/mayoromenor", 
        loadChildren: () => import('../app/components/juegos/mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule)
    },
    { 
        path:"juegos/blackjack", 
        loadChildren: () => import('../app/components/juegos/blackjack/blackjack.module').then(m => m.BlackjackModule)
    },
    { 
        path:"juegos/preguntados", 
        loadChildren: () => import('../app/components/juegos/preguntados/preguntados.module').then(m => m.PreguntadosModule)
    },
    { 
        path:"chat",
        loadChildren: () => import('../app/components/chat/chat.module').then(m => m.ChatModule)
    },
    { path: '**', component:LoginComponent}
];
