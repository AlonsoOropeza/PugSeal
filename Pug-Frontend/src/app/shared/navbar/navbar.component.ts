import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from 'app/models/models.model';
import { Router } from '@angular/router';




@Component({
    // moduleId: module.id,
    // tslint:disable-next-line: component-selector
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public user: Usuario;

    constructor(location: Location,  private element: ElementRef, private cookies: CookieService, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit() {
        this.user = JSON.parse(this.getCookie('user'))
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    getCookie(name: string) {
        return this.cookies.get(name);
    }

    public logOut() {
        this.cookies.delete('user');
        // window.location.reload();
        this.router.navigateByUrl('')
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function() {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if ( titlee.charAt(0) === '/') {
          titlee = titlee.slice( 2 );
      }

      for (let item = 0; item < this.listTitles.length; item++) {
          if (this.listTitles[item].path === titlee) {
              return this.listTitles[item].title;
          }
      }
      return 'Sistema de Gestion de Calidad';
    }
}
