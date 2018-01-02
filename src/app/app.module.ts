import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuModule, PanelModule, TabViewModule, DataTableModule, SharedModule, DialogModule, InputTextModule, ButtonModule,
         MenuItem, TreeTableModule,TreeNode,DropdownModule, ToggleButtonModule } from "primeng/primeng";
import { FormsModule } from '@angular/forms';
import { Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { ContacsComponent } from './contacs/contacs.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { VenuesComponent } from './venues/venues.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'contacts', component: ContacsComponent},
  { path: 'appointments', component: AppointmentsComponent},
  { path: 'venues', component: VenuesComponent},
  { path: 'treeview', component: TreeviewComponent},
  { path: '', redirectTo: '/dashboard', pathMatch:'full'},
  { path: '**', redirectTo: '/dashboard', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DashboardComponent,
    TreeviewComponent,
    ContacsComponent,
    AppointmentsComponent,
    VenuesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    PanelModule,
    MenuModule,
    TabViewModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TreeTableModule,
    HttpClientModule,
    DropdownModule,
    ToggleButtonModule,
    

    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
