import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/models.model';
import { CookieService } from 'ngx-cookie-service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
];
export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: '/calendario', title: 'Calendario',  icon: 'pe-7s-date', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'pe-7s-note2', class: '' },
  { path: '/gestion', title: 'Gestión Interna',  icon: 'pe-7s-network', class: '' },
  // { path: '/user', title: 'User Profile',  icon: 'pe-7s-user', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public user: Usuario;
  allRoutes: any[];

  constructor(private cookies: CookieService) { }

  ngOnInit() {
    this.user = JSON.parse(this.getCookie('user'));
    const routes: any = this.user.rol === 'Admin' ? ADMINROUTES : ROUTES;
    this.menuItems = routes.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  getCookie(name: string) {
    return this.cookies.get(name);
}
}
