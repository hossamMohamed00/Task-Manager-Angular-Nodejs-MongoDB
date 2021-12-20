import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TaskManagerViewComponent } from './components/task-manager-view/task-manager-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'
import { ListViewComponent } from './components/list-view/list-view.component';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerViewComponent,
    AddNewListComponent,
    ListViewComponent,
    TaskViewComponent,
    AddNewTaskComponent,
    LoginComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
