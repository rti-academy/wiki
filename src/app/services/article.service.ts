import { Article } from '../models/article';

interface AddParams {
  title: string;
  content: string;
  parentId: number;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Корневой раздел',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 0
  },
  {
    id: 2,
    title: 'Подраздел 1',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  },
  {
    id: 3,
    title: 'Подраздел 2',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  },
  {
    id: 4,
    title: 'Подраздел 3',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  },
  {
    id: 5,
    title: 'Подраздел 1.1',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 2
  },
  {
    id: 6,
    title: 'Подраздел 1.2',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 2
  },
  {
    id: 7,
    title: 'Подраздел 1.1.1',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 5
  },
  {
    id: 8,
    title: 'Подраздел 1.1.2',
    creationTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 5
  },
];

export class ArticleService {
  private counter = 0;
  public articles: Article[] = mockArticles;

  public add({ title, content, parentId }: AddParams): void {
    const id = ++this.counter;
    const creationTime = new Date();
    const version = 1;
    this.articles.push({ id, title, content, parentId, creationTime, version });
  }

  public edit(id: number, { title, content }: AddParams): void {
    this.articles.forEach(article => {
      if (article.id === id) {
        article.title = title;
        article.content = content;
      }
    });
  }

  public get(id: number): Article {
    return this.articles.find(article => article.id === id);
  }

  public getAll(): Article[] {
    return this.articles;
  }

  public delete(id: number): void {
    this.articles.forEach((article, index) => {
      if (article.id === id) {
        this.articles.splice(index, 1);
      }
    });
  }

  public search(title): Article[] {
    return this.articles.filter(article => {
      return article.title.includes(title);
    });
  }
}
