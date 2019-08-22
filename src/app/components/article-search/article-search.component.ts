import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleService } from '@app/services/article.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Article } from '@app/models/article';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article-search',
    templateUrl: './article-search.component.html',
    styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
    public filteredArticles: Observable<Article[]>;


    @ViewChild('searchInput', { static: false })
    public searchInput: ElementRef<HTMLInputElement>;
    public searchControl = new FormControl();

    constructor(private articleService: ArticleService,
                private router: Router) {
    }

    ngOnInit() {
        // this.filteredArticles = this.searchControl.valueChanges
        //     .pipe(
        //         map(value => typeof value === 'string' ? value : value.title),
        //         map(value => {
        //             return this.articleService.search(value);
        //         })
        //     );
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const article: Article = event.option.value;
        this.router.navigate(['articles', article.id]);
        this.resetSearchField();
    }

    private resetSearchField(): void {
        this.searchInput.nativeElement.value = '';
        this.searchControl.setValue('');
    }

    display(article?: Article): string | undefined {
        return article ? article.title : undefined;
    }
}
