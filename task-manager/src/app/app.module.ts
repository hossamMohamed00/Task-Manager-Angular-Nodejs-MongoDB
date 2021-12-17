import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TaskViewComponent } from './components/task-view/task-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'

@NgModule({
  declarations: [AppComponent, TaskViewComponent, AddNewListComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
