import { ChangeDetectorRef, Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { AngularMaterialModule } from '../../angular-material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { AhorcadoComponent } from '../juegos/ahorcado/ahorcado.component';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularMaterialModule,AhorcadoComponent,ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: Auth, private router:Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  CloseSession(){
    localStorage.removeItem('userLogin');
    this.router.navigateByUrl('/login');
  }

  Ahorcado(){
    this.router.navigateByUrl('/juegos/ahorcado');
  }
}
