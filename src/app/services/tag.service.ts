import { Injectable } from '@angular/core';
import { TagsComponent } from '../components/tags/tags.component';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public allTag: Tag[] = [
    {id: 1, value: "Home"},
    {id: 2, value: "Sun"},
    {id: 3, value: "Ball"}
  ];
  public tags: Tag[] = [];
  public idCount: number = 0;

  constructor() { }

  public add(value: string): Tag[] {  
    this.idCount++; 
    this.tags.push({ id: this.idCount, value: value });
    return this.tags;    
  }

  public remove(tag: Tag): Tag[]{
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    };
    return this.tags;
    
  };

  public getAll(): Tag[] {
    return this.tags;
  }

  public getById(id: number): Tag {
      return this.tags.find(element => (element.id === id));
  }
}
