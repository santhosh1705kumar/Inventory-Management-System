import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';
import { AboutComponent } from './about/about.component';
export const routes: Routes = [
{
    path:'supplier',component: SupplierComponent
},
{
    path:'about',component: AboutComponent
}

];