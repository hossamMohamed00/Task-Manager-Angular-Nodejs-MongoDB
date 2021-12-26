import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TaskManagerViewComponent } from './components/task-manager-view/task-manager-view.component'
import { AddNewListComponent } from './components/add-new-list/add-new-list.component'
import { EditListComponent } from './components/edit-list/edit-list.component'
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component'
import { EditTaskComponent } from './components/edit-task/edit-task.component'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'
// Create routes
const routes: Routes = [
  {
    // Redirect the user to the lists page
    path: '',
    redirectTo: 'lists',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
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
    path: 'edit-list/:listId',
    component: EditListComponent
  },
  {
    // Setup it in the add-new-list page
    path: 'lists/:listId/add-new-task',
    component: AddNewTaskComponent
  },
  {
    // Setup it in the add-new-list page
    path: 'lists/:listId/edit-task/:taskId',
    component: EditTaskComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
