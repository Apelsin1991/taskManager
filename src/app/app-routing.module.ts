import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent},
      {path: 'task/:id', component: TaskPageComponent},
      {path: 'create', component: CreateTaskComponent},
      {path: 'edit/:id', component: EditPageComponent},
      {path: 'error', component: ErrorComponent},
      {path: '**', redirectTo: 'error'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
