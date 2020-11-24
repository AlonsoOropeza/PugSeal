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
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/actividades', title: 'Mis Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
    { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'pe-7s-note2', class: '' },
    { path: '/calendario', title: 'Calendario de actividades',  icon: 'pe-7s-date', class: '' },
    { path: '/requisiciones', title: 'Requisiciones',  icon: 'pe-7s-portfolio', class: '' },
    { path: '/table', title: 'Table List',  icon: 'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon: 'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'pe-7s-bell', class: '' }
];
export const LIMPIEZAROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/bitacora-mediciones', title: 'Bitacora Mediciones', icon: 'pe-7s-note2', class: ''},
  { path: '/actividades', title: 'Mis Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
];
export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/presupuesto', title: 'Presupuesto anual',  icon: 'glyphicon glyphicon-usd', class: '' },
  { path: '/actividades', title: 'Mis Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/calendario', title: 'Calendario de actividades',  icon: 'glyphicon glyphicon-calendar', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'pe-7s-note2', class: '' },
  { path: '/gestion', title: 'Gestión Interna',  icon: 'glyphicon glyphicon-cog', class: '' },
  // { path: '/user', title: 'User Profile',  icon: 'pe-7s-user', class: '' },
  { path: '/bitacora-mediciones', title: 'Bitacora Mediciones', icon: 'pe-7s-note2', class: ''},
  { path: '/areas', title: 'Areas',  icon: 'pe-7s-note2', class: '' },
  { path: '/categorias', title: 'Categorias',  icon: 'pe-7s-note2', class: '' },
  { path: '/proveedores', title: 'Proveedores',  icon: 'pe-7s-portfolio', class: '' },
  { path: '/requisiciones', title: 'Requisiciones',  icon: 'pe-7s-portfolio', class: '' },
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
