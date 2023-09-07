import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";


@NgModule({
    declarations: [
        QuestionComponent
    ],
    exports: [
        QuestionComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule
  ]
})
export class QuestionModule { }
