import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Tag } from '../../models/tag';
import { TagService } from '../../services/tag.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']

})
export class TagsComponent implements OnInit {
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allTags: Tag[];
  articleTags: Tag[] = [];

  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;

  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;

  @ViewChild('tagInput', { static: false })
  tagInput: ElementRef<HTMLInputElement>;

  constructor(private tagService: TagService) {
    this.allTags = tagService.getAll();
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    const input = event.input;
    const value = event.value;

    // if (!this.matAutocomplete.isOpen && !this.isContainTag(value)) {
    if (!this.isContainTag(value)) {

      // Add our tag
      if ((value || '').trim()) {
        this.allTags = this.tagService.add(value);
        const lastInsertedTag = this.allTags[this.allTags.length - 1];
        this.articleTags.push(lastInsertedTag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
        this.tagCtrl.setValue('');
      }
    }
  }

  remove(tag: Tag): void {
    this.allTags = this.tagService.remove(tag); // удалять только из статьи
    const index = this.articleTags.findIndex(t => t === tag);
    this.articleTags.splice(index, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.isContainTag(event.option.viewValue)) {
      this.articleTags.push({ id: 0, value: event.option.viewValue });
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue('');
    }
  }


  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges
      .pipe(
        map(value => {
          return this._filter(value);
        })
      );
  }

  private isContainTag(tagValue: string) {
    // TODO
    const index = this.articleTags.findIndex(t => t.value.toLowerCase() === tagValue.toLowerCase());
    return index >= 0;
  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return value
      ? this.allTags.filter(option => option.value.toLowerCase().includes(filterValue))
      : [];
  }

}
