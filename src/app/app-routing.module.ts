import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { TaskPageComponent } from './task-page/task-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'task/:id', component: TaskPageComponent},
      {path: 'create', component: CreateTaskComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
