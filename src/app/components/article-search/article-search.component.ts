import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleService } from '@app/services/article.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter, findIndex } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Article } from '@app/models/article';

@Component({
    selector: 'app-article-search',
    templateUrl: './article-search.component.html',
    styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
    public filteredArticles: Article[];

    @Input()
    includedNodeIDs: number[] = [];

    @Input()
    public type = 'note';

    @Output()
    public selected = new EventEmitter();

    public searchControl = new FormControl();

    constructor(
        private articleService: ArticleService,
    ) {
    }

    ngOnInit() {
        this.handleInputValue();
    }

    public handleSelect(event: MatAutocompleteSelectedEvent): void {
        const article: Article = event.option.value;
        this.selected.emit(article);
        this.filteredArticles = [];
    }

    public reset(): void {
        this.searchControl.setValue('');
    }

    public display(article?: Article): string | undefined {
        return article ? article.title : undefined;
    }

    private handleInputValue() {
        let subscription: Subscription;

        this.getInputValues().pipe(
            filter(value => value !== ''),
        ).subscribe(value => {
            subscription = this.articleService.search(value, this.type)
                .subscribe(articles => {

                    if (this.includedNodeIDs && this.includedNodeIDs.length > 0) {
                        articles = articles.filter(article =>
                            this.includedNodeIDs.findIndex(id =>
                                article.parentId === id) >= 0);
                    }

                    this.filteredArticles = articles;
                });
        });

        this.getInputValues().pipe(
            filter(value => value === ''),
        ).subscribe(() => {
            if (subscription) {
                subscription.unsubscribe();
            }
            this.filteredArticles = [];
        });
    }

    private getInputValues(): Observable<string> {
        return this.searchControl.valueChanges
            .pipe(
                map(value => typeof value === 'string' ? value : value.title),
                map(value => value.trim()),
            );
    }
}
