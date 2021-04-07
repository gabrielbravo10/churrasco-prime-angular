import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // menus: IMenu[];

  // constructor(
  //   private authSrv: AuthService
  // ) {
  //   this.menus = [
  //     { label: 'Home', icon: 'home', routerLink: ['/'] },
  //     { label: 'Relatórios', routerLink: ['/report'] },
  //     { label: 'Administração', routerLink: ['/admin'] },
  //   ];
  // }

  // ngOnInit(): void {
  // }

  // logout() {
  //   this.authSrv.logout();
  // }
}
