import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './components/comments/comments.component';
import { ArticleService } from './services/article.service';
import { ArticleStatusService } from './services/article-status.service';
import { HeadingTreeComponent } from './components/heading-tree/heading-tree.component';
import { HeadingTreeNodeComponent } from './components/heading-tree/heading-tree-node/heading-tree-node.component';
import { ArticleComponent } from './components/article/article.component';
import { TagsComponent } from './components/tags/tags.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { ArticleSearchComponent } from './components/article-search/article-search.component';
import { RubricComponent } from './components/rubric/rubric.component';
import { CommentComponent } from './components/comments/comment/comment.component';

import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { SidenavSearchComponent } from './components/sidenav-search/sidenav-search.component';
import { SetRubricDialogComponent } from './components/set-rubric-dialog/set-rubric-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { ArticleMenuComponent } from './components/article-menu/article-menu.component';
import { RubricNestedNodeComponent } from './components/rubric/rubric-nested-node/rubric-nested-node.component';
import { RubricNodeComponent } from './components/rubric/rubric-node/rubric-node.component';
import { DialogService } from './services/dialog.service';
import { SaveRubricDialogComponent } from './components/save-rubric-dialog/save-rubric-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    HeadingTreeComponent,
    HeadingTreeNodeComponent,
    ArticleComponent,
    TagsComponent,
    ArticleEditorComponent,
    ArticleSearchComponent,
    RubricComponent,
    CommentComponent,
    DeleteDialogComponent,
    SidenavSearchComponent,
    SetRubricDialogComponent,
    HeaderComponent,
    FileUploaderComponent,
    FileViewComponent,
    ArticleMenuComponent,
    RubricNestedNodeComponent,
    RubricNodeComponent,
    SaveRubricDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    QuillModule.forRoot(),
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ArticleComponent },
      { path: 'articles/:id', component: ArticleComponent },
      { path: 'articles/:id/:action', component: ArticleEditorComponent },
    ]),
    MatTreeModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  entryComponents: [
    DeleteDialogComponent,
    SetRubricDialogComponent,
    SaveRubricDialogComponent,
  ],
  providers: [
    CommentsService,
    ArticleService,
    ArticleStatusService,
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
