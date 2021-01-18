import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule
    ],
    declarations: [],
    providers: []
})
export class SharedModule { }
