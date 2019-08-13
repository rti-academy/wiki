import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './components/comments/comments.component';
import { ArticleService } from './services/article.service';
import { HeadingTreeComponent } from './components/heading-tree/heading-tree.component';
import { HeadingTreeNodeComponent } from './components/heading-tree-node/heading-tree-node.component';
import { ArticleComponent } from './components/article/article.component';
import { TagsComponent } from './components/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    HeadingTreeComponent,
    HeadingTreeNodeComponent,
    ArticleComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ArticleComponent },
      { path: 'articles/:id', component: ArticleComponent },
      { path: 'articles/:id/edit', component: AppComponent },
    ]),
  ],
  providers: [
    CommentsService,
    ArticleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
