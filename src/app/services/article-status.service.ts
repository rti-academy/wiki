import { Injectable } from '@angular/core';

export interface StatusValueViewPair {
  value: string;
  view: string;
}

@Injectable()
export class ArticleStatusService {

  constructor() { }

  public statuses = [
    {value: 'archive', view: 'В архиве'},
    {value: 'active', view: 'Актуальный'},
    {value: 'draft', view: 'Черновик'},
  ];

  public getView(value: string) {
    return this.statuses.find((status) => {
      return value === status.value;
    }).view;
  }

  public getValue(view: string) {
    return this.statuses.find((status) => {
      return view === status.value;
    }).view;
  }
}
