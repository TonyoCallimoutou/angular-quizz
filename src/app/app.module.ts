import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {QuestionModule} from "./shared/component/question/question.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import { QuizComponent } from './home/quiz/quiz.component';
import { QuestionnaireComponent } from './shared/component/questionnaire/questionnaire.component';
import { LoginComponent } from './home/login/login.component';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { AbbreviatePipe } from './shared/utils/pipe/abbreviate.pipe';
import { TimePipe } from './shared/utils/pipe/time.pipe';
import { HighlightDirective } from './shared/utils/directives/highlight.directive';
import { PrefixDirective } from './shared/utils/directives/prefix.directive';
import {DirectiveModule} from "./shared/utils/directives/directive.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    QuestionnaireComponent,
    LoginComponent,
    AbbreviatePipe,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    DirectiveModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
