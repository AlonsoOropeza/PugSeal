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
import { CategoriasComponent } from './admin/categorias/categorias.component';
import { CategoriaFormComponent } from './forms/categoria-form/categoria-form.component';
import { AreaFormComponent } from './forms/area-form/area-form.component';
import { AreasComponent } from './admin/areas/areas.component';

import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ProveedoresComponent } from './admin/proveedores/proveedores.component';


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
    NgxSpinnerModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MantenimientoPreventivoComponent,
    MantenimientoPreventivoFormComponent,
    CategoriasComponent,
    CategoriaFormComponent,
    AreaFormComponent,
    AreasComponent,
    ProveedoresComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
