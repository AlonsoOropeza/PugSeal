import { GestionComponent } from './../../admin/gestion/gestion.component';
import { CalendarioComponent } from './../../admin/calendario/calendario.component';
import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MantenimientoPreventivoComponent } from '../../admin/mantenimiento-preventivo/mantenimiento-preventivo.component'
import { CategoriasComponent } from 'app/admin/categorias/categorias.component';
import { AreasComponent } from 'app/admin/areas/areas.component';
import { RequisicionesComponent } from 'app/admin/requisiciones/requisiciones.component';
import { BitacoraMedicionesComponent } from 'app/admin/bitacora-mediciones/bitacora-mediciones.component';
import { ProveedoresComponent } from 'app/admin/proveedores/proveedores.component';
import { ActividadesComponent } from 'app/admin/actividades/actividades.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: HomeComponent                    },
    { path: 'user',                     component: UserComponent                    },
    { path: 'table',                    component: TablesComponent                  },
    { path: 'typography',               component: TypographyComponent              },
    { path: 'icons',                    component: IconsComponent                   },
    { path: 'maps',                     component: MapsComponent                    },
    { path: 'notifications',            component: NotificationsComponent           },
    { path: 'upgrade',                  component: UpgradeComponent                 },
    { path: 'mantenimiento-preventivo', component: MantenimientoPreventivoComponent },
    { path: 'calendario',               component: CalendarioComponent              },
    { path: 'gestion',                  component: GestionComponent                 },
    { path: 'bitacora-mediciones',      component: BitacoraMedicionesComponent      },
    { path: 'categorias',               component: CategoriasComponent              },
    { path: 'areas',                    component: AreasComponent                   },
    { path: 'proveedores',              component: ProveedoresComponent             },
<<<<<<< HEAD
    { path: 'actividades',              component: ActividadesComponent             }
=======
    { path: 'requisiciones',            component: RequisicionesComponent           }
>>>>>>> 8d6d31c8a563fc45c0fcbc99969624980e2a94f9
]
