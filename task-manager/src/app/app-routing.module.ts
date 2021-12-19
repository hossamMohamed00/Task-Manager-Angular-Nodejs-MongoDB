import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TaskManagerViewComponent } from './components/task-manager-view/task-manager-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component'

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
    component: TaskManagerViewComponent
  },
  {
    path: 'lists/:listId',
    component: TaskManagerViewComponent
  },
  {
    // Setup it in the add-new-list page
    path: 'add-new-list',
    component: AddNewListComponent
  },
  {
    // Setup it in the add-new-list page
    path: 'lists/:listId/add-new-task',
    component: AddNewTaskComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
