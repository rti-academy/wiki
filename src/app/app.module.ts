import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { ArticleService } from './services/article.service';
import { HeadingTreeComponent } from './components/heading-tree/heading-tree.component';
import { HeadingTreeNodeComponent } from './components/heading-tree-node/heading-tree-node.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    HeadingTreeComponent,
    HeadingTreeNodeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    CommentsService,
    ArticleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
