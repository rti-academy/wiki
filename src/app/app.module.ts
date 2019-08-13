import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

import { AppComponent } from "./app.component";
import { ArticleComponent } from "./components/article/article.component";

@NgModule({
  declarations: [AppComponent, ArticleComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatSidenavModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
