import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './components/task-view/task-view.component';

// Create routes
const appRoutes: Routes = [
  {
    // Setup it in the root path
    path: '',
    component: TaskViewComponent,
  },
];

@NgModule({
  declarations: [AppComponent, TaskViewComponent],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
