import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MantenimientoPreventivoComponent } from './admin/mantenimiento-preventivo/mantenimiento-preventivo.component';
import { MantenimientoPreventivoFormComponent } from './forms/mantenimiento-preventivo-form/mantenimiento-preventivo-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MantenimientoPreventivoComponent,
    MantenimientoPreventivoFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
