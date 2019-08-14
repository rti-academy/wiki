import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './components/comments/comments.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
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
