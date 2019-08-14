import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { ArticleComponent } from "./components/article/article.component";

@NgModule({
  declarations: [AppComponent, ArticleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: "", component: ArticleComponent },
      { path: "articles/:id", component: ArticleComponent },
      { path: "article/edit", component: AppComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
