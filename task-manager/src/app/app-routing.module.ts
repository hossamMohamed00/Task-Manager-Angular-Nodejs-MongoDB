import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TaskViewComponent } from './components/task-view/task-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'

// Create routes
const routes: Routes = [
  {
    // Redirect the user
    path: '',
    redirectTo: 'lists',
    pathMatch: 'full'
  },
  {
    // Setup it in the add-new-list page
    path: 'lists',
    component: TaskViewComponent
  },
  {
    // Setup it in the add-new-list page
    path: 'add-new-list',
    component: AddNewListComponent
  },
  {
    path: 'lists/:listId',
    component: TaskViewComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
