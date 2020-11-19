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
export const LIMPIEZAROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: '/bitacora-mediciones', title: 'Bitacora Mediciones', icon: 'pe-7s-note2', class: ''},
];
export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: '/calendario', title: 'Mi calendario',  icon: 'pe-7s-date', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'pe-7s-note2', class: '' },
  { path: '/gestion', title: 'Gestión Interna',  icon: 'pe-7s-network', class: '' },
  // { path: '/user', title: 'User Profile',  icon: 'pe-7s-user', class: '' },
  { path: '/bitacora-mediciones', title: 'Bitacora Mediciones', icon: 'pe-7s-note2', class: ''},
  { path: '/areas', title: 'Areas',  icon: 'pe-7s-note2', class: '' },
  { path: '/categorias', title: 'Categorias',  icon: 'pe-7s-note2', class: '' },
  { path: '/proveedores', title: 'Proveedores',  icon: 'pe-7s-portfolio', class: '' }
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
    let routes: any;
    if (this.user.rol === 'Admin') {
      routes = ADMINROUTES;
    } else if ( this.user.rol === 'Limpieza') {
      routes = LIMPIEZAROUTES;
    } else {
      routes = ROUTES;
    }
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
