import { Injectable } from '@angular/core';

import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tags: Tag[] = [];
  private idCount: number = 0;

  constructor() { }

  public add(value: string): void {  
    this.idCount++;  
    this.tags.push({ id: this.idCount, value: value });    
  }

  public getAll(): Tag[] {
    return this.tags;
  }

  public getById(id: number): Tag {
      return this.tags.find(element => (element.id === id));
  }
}
