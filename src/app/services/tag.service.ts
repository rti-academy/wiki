import { Injectable } from '@angular/core';

import { Tag } from '../models/tag';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tags: Tag[] = [];

  constructor() { }


  addTag(tagValue:string){
    let id=0;
    if(this.tags.length!==0){
      id=this.tags[this.tags.length-1].id++;
    }
    this.tags.push({id:id,value:tagValue});
  }

  getTags(){
    return this.tags;
  }

  getTagById(id:number) {
      return this.tags.find(
      element => {
      if(element.id===id){
        return true;
      }
      return false;
    })    
  }
}