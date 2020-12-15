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
  { path: '/actividades', title: 'Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/incidencias', title: 'Incidencias',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'glyphicon glyphicon-list-alt', class: '' },
  { path: '/mantenimiento-correctivo', title: 'Mantenimiento Correctivo',  icon: 'glyphicon glyphicon-wrench', class: '' },
  { path: '/calendario', title: 'Calendario de actividades',  icon: 'glyphicon glyphicon-calendar', class: '' },
  { path: '/faqs', title: 'FAQs',  icon: 'glyphicon glyphicon-question-sign', class: '' },
];
export const SUPERVISORROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/actividades', title: 'Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/incidencias', title: 'Incidencias',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/calendario', title: 'Calendario de actividades',  icon: 'glyphicon glyphicon-calendar', class: '' },
  { path: '/faqs', title: 'FAQs',  icon: 'glyphicon glyphicon-question-sign', class: '' },
];
export const AUDITORROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/actividades', title: 'Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/incidencias', title: 'Incidencias',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'glyphicon glyphicon-list-alt', class: '' },
  { path: '/mantenimiento-correctivo', title: 'Mantenimiento Correctivo',  icon: 'glyphicon glyphicon-wrench', class: '' },
  { path: '/calendario', title: 'Calendario de actividades',  icon: 'glyphicon glyphicon-calendar', class: '' },
  { path: '/areas', title: 'Areas',  icon: 'glyphicon glyphicon-tower', class: '' },
  { path: '/categorias', title: 'Categorias',  icon: 'glyphicon glyphicon-lamp', class: '' },
  { path: '/proveedores', title: 'Proveedores',  icon: 'glyphicon glyphicon-briefcase', class: '' },
  { path: '/faqs', title: 'FAQs',  icon: 'glyphicon glyphicon-question-sign', class: '' },
];
export const ADMINROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'glyphicon glyphicon-stats', class: '' },
  { path: '/presupuesto', title: 'Presupuesto anual',  icon: 'glyphicon glyphicon-usd', class: '' },
  { path: '/actividades', title: 'Actividades',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/incidencias', title: 'Incidencias',  icon: 'glyphicon glyphicon-tasks', class: '' },
  { path: '/mantenimiento-preventivo', title: 'Mantenimiento Preventivo',  icon: 'glyphicon glyphicon-list-alt', class: '' },
  { path: '/mantenimiento-correctivo', title: 'Mantenimiento Correctivo',  icon: 'glyphicon glyphicon-wrench', class: '' },
  // { path: '/user', title: 'User Profile',  icon: 'pe-7s-user', class: '' },
  { path: '/areas', title: 'Áreas',  icon: 'glyphicon glyphicon-tower', class: '' },
  { path: '/categorias', title: 'Categorías',  icon: 'glyphicon glyphicon-lamp', class: '' },
  { path: '/proveedores', title: 'Proveedores',  icon: 'glyphicon glyphicon-briefcase', class: '' },
  { path: '/requisiciones', title: 'Requisiciones',  icon: 'glyphicon glyphicon-book', class: '' },
  { path: '/hoteles', title: 'Hoteles',  icon: 'glyphicon glyphicon-bed', class: '' },
  { path: '/faqs', title: 'FAQs',  icon: 'glyphicon glyphicon-question-sign', class: '' },
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
    } else if (this.user.rol === 'Supervisor') {
      routes = SUPERVISORROUTES;
    } else if (this.user.rol === 'Auditor') {
      routes = AUDITORROUTES;
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
