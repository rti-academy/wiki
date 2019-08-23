import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleService } from '@app/services/article.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Article } from '@app/models/article';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article-search',
    templateUrl: './article-search.component.html',
    styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
    public filteredArticles: Article[];

    @Input()
    public type = 'note';

    @Output()
    public selected = new EventEmitter();

    @ViewChild('searchInput', { static: false })
    public searchInput: ElementRef<HTMLInputElement>;
    public searchControl = new FormControl();

    constructor(
        private articleService: ArticleService,
    ) {
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .pipe(
                map(value => typeof value === 'string' ? value : value.title),
            )
            .subscribe(value => {
                this.articleService.search(value, this.type)
                    .subscribe(articles => {
                        this.filteredArticles = value ? articles : [];
                    });
            });
    }

    public handleSelect(event: MatAutocompleteSelectedEvent): void {
        const article: Article = event.option.value;
        this.selected.emit(article);
        this.filteredArticles = [];
        this.reset();
    }

    public reset(): void {
        this.searchControl.setValue('');
    }

    public display(article?: Article): string | undefined {
        return article ? article.title : undefined;
    }
}
