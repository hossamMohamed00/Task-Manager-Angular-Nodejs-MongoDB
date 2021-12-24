import { RequestInterceptor } from './services/httpInterceptor/request.interceptor'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TaskManagerViewComponent } from './components/task-manager-view/task-manager-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'
import { ListViewComponent } from './components/list-view/list-view.component'
import { TaskViewComponent } from './components/task-view/task-view.component'
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component'
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { CustomPipePipe } from './custom-pipe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerViewComponent,
    AddNewListComponent,
    ListViewComponent,
    TaskViewComponent,
    AddNewTaskComponent,
    LoginComponent,
    SignupComponent,
    EditListComponent,
    EditTaskComponent,
    CustomPipePipe
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
