import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';

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

  public articleTags: Tag[] = [];
  public tagCtrl = new FormControl();
  public filteredTags: Tag[] = [];

  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;

  @ViewChild('tagInput', { static: false })
  tagInput: ElementRef<HTMLInputElement>;

  constructor(private tagService: TagService) {
  }

  add(event: MatChipInputEvent): void {
    let value = event.value;
    value = value.trim();

    if ((value || '') && !this.isContainTag(value)) {
      this.addTag(value);
      this.tagInputReset();
    }
  }

  remove(tag: Tag): void {
    const index = this.articleTags.findIndex(t => t.id === tag.id);
    this.articleTags.splice(index, 1);
    this.tagService.deleteTagFormArticle(this.articleId, tag.id)
      .subscribe(() => {});
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.isContainTag(value)) {
      this.addTag(value);
      this.tagInputReset();
    }
  }

  ngOnInit(): void {
    this.tagCtrl.valueChanges
      .subscribe(value => {
          this.tagService.search(value)
            .subscribe(tags => {
              this.filteredTags = value ? tags
                : [];
            });
      });
  }

  ngOnChanges(): void {
    this.tagService.getTagsByArticle(this.articleId)
      .subscribe(tags => {
        this.articleTags = tags;
      });
  }

  private addTag(value: string): void {
    this.tagService.addTagToArticle(this.articleId, value)
      .subscribe(() => this.tagService.getTagsByArticle(this.articleId)
        .subscribe(tags => this.articleTags = tags));
  }

  private isContainTag(tagValue: string): boolean {
    const index = this.articleTags.findIndex(t => t.value.toLowerCase() === tagValue.toLowerCase());
    return index >= 0;
  }

  private tagInputReset(): void {
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue('');
  }

}
