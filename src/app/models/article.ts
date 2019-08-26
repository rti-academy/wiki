export class Article {
  static statuses = [
    {value: 'archive', view: 'В архиве'},
    {value: 'active', view: 'Актуальный'},
    {value: 'draft', view: 'Черновик'},
  ];

  id: number;
  title: string;
  creationTime: Date;
  updateTime: Date;
  version: number;
  content: string;
  parentId: number;
  status: string;

  static getStatus(value: string) {
    let viewStatus: string;

    this.statuses.forEach((status) => {
      if (value === status.value) {
        viewStatus = status.view;
      }
    });

    return viewStatus;
  }
}
