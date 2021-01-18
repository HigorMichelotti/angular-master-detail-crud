import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        MenuLateralComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule
    ],
    exports: [
        // SHARED MODULES
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule,
        MenuLateralComponent
    ]
})
export class CoreModule { }
