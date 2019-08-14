import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  tags: Tag[] = [];
  
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;

  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;

  constructor(private tagService: TagService) { }
  
 add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags = this.tagService.add(value);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue('');
    }
  }

  remove(tag: Tag): void {
    this.tags = this.tagService.remove(tag);
  }

 selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
   
    /*this.tags.push({id:0, value: event.option.viewValue});
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue('');*/
  }
  

  ngOnInit() {
    this.filteredTags = this.tagCtrl.valueChanges
      .pipe(
        map(value => this._filter(value))
      );
  };

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    return value
      ? this.tags.filter(option => option.value.toLowerCase().includes(filterValue))
      : [];
  };

}
