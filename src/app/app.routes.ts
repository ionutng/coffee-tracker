import { Routes } from '@angular/router';
import { IndexComponent } from './records/index/index.component';
import { ViewComponent } from './records/view/view.component';
import { CreateComponent } from './records/create/create.component';
import { EditComponent } from './records/edit/edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'records/index', pathMatch: 'full'},
    { path: 'records', redirectTo: 'records/index', pathMatch: 'full'},
    { path: 'records/index', component: IndexComponent},
    { path: 'records/:id/view', component: ViewComponent},
    { path: 'records/create', component: CreateComponent},
    { path: 'records/:id/edit', component: EditComponent},
];
