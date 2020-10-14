import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/auth.guard';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { TaskPageComponent } from './task-page/task-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      {path: 'task/:id', component: TaskPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard]},
      {path: 'create/:id', component: CreateTaskComponent, canActivate: [AuthGuard]}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 