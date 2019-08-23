import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';
import { ArticleService } from '@app/services/article.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']

})
export class TagsComponent implements OnInit, OnChanges {
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input()
  public articleId: number;

  allTags: Tag[];
  articleTags: Tag[] = [];

  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;

  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;

  @ViewChild('tagInput', { static: false })
  tagInput: ElementRef<HTMLInputElement>;

  constructor(private tagService: TagService, private articleService: ArticleService) {
    this.allTags = tagService.getAll();
  }

  add(event: MatChipInputEvent): void {
    let value = event.value;
    value = value.trim();

    if ((value || '') && !this.isContainTag(value)) {
      // this.addTag(value);
      this.tagInputReset();
    }
  }

  remove(tag: Tag): void {
  //   this.articleService.deleteTagFromArticle(this.articleId, tag.id);
  //   this.articleTags = this.getArticleTags(this.articleId);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.isContainTag(value)) {
      // this.addTag(value);
      this.tagInputReset();
    }
  }

  ngOnInit(): void {
    // this.filteredTags = this.tagCtrl.valueChanges
    //   .pipe(
    //     map(value => {
    //       return this._filter(value);
    //     })
    //   );
    // this.articleTags = this.getArticleTags(this.articleId);
  }

  ngOnChanges(): void {
    // this.articleTags = this.getArticleTags(this.articleId);
  }

  // private addTag(value: string) {
  //   this.tagService.add(value);
  //   const tag = this.tagService.getByTagValueIgnoreCase(value);
  //   this.articleService.addTagToArticle(this.articleId, tag.id);
  //   this.articleTags = this.getArticleTags(this.articleId);
  // }

  private isContainTag(tagValue: string) {
    const index = this.articleTags.findIndex(t => t.value.toLowerCase() === tagValue.toLowerCase());
    return index >= 0;
  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return value
      ? this.allTags.filter(option => option.value.toLowerCase().includes(filterValue))
      : [];
  }

  // private getArticleTags(articleId: number): Tag[] {
  //   const article = this.articleService.get(articleId);
  //   return article.tags.map(tagId => this.tagService.getById(tagId));
  // }

  private tagInputReset() {
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue('');
  }
}
