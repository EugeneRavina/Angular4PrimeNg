import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuModule, PanelModule, TabViewModule, DataTableModule, SharedModule, DialogModule, InputTextModule, ButtonModule,
         MenuItem, TreeTableModule,TreeNode } from "primeng/primeng";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeviewComponent } from './treeview/treeview.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'treeview', component: TreeviewComponent},
  { path: '', redirectTo: '/dashboard', pathMatch:'full'},
  { path: '**', redirectTo: '/dashboard', pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DashboardComponent,
    TreeviewComponent
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

    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
