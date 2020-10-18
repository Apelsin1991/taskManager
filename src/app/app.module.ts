import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsSearch } from './shared/search.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert.servise';
import { ErrorComponent } from './error/error.component';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    TaskPageComponent,
    CreateTaskComponent,
    PostsSearch,
    EditPageComponent,
    AlertComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
