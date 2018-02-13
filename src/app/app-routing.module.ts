import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { CreateComponent } from './create/create.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'articles/:id',
        component: ArticleComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'edit/:id',
        component: CreateComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }