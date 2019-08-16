import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';

const tagsMock = [
  { id: 1, value: 'Базовые знания' },
  { id: 2, value: 'Продвинутые знания' },
];

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public tags: Tag[] = tagsMock;
  public idCount = 3;

  constructor() { }

  public add(value: string): Tag[] {
    if (!this.exists(value)) {
      this.idCount++;
      this.tags.push({ id: this.idCount, value });
    }
    return this.tags;
  }

  public remove(tag: Tag): Tag[] {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    return this.tags;

  }

  public getAll(): Tag[] {
    return this.tags;
  }

  public getById(id: number): Tag {
    return this.tags.find(element => (element.id === id));
  }

  public getByTagValueIgnoreCase(value: string): Tag {
    return this.tags.find(tag => tag.value.toLowerCase() === value.toLowerCase());
  }

  public exists(tagValue: string): boolean {
    const index = this.tags.findIndex(t => t.value.toLowerCase() === tagValue.toLowerCase());
    return index >= 0;
  }
}
