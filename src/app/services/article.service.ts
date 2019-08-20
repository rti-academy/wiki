import { Article } from '../models/article';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Tag } from '@app/models/tag';
import { TagService } from './tag.service';

export interface AddParams {
  title: string;
  content: string;
  parentId: number;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Демо раздел',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `<h2>Расходящийся ряд</h2>
<p>Закон исключённого третьего индуктивно трансформирует знак. Смысл жизни создает трансцендентальный мир, учитывая опасность, которую представляли собой писания Дюринга для не окрепшего еще немецкого рабочего движения. Исчисление предикатов понимает под собой гедонизм. Диалектика представляет собой принцип восприятия. Здравый смысл, следовательно, рефлектирует субъективный гравитационный парадокс. Ощущение мира поразительно.торый описывает что-то важное</p>
<ul><li>Амфифильный нонаккорд: методология и особенности</li>
<li>Структурный механизм власти: методология и особенности</li>
<li>Однокомпонентный горизонт — актуальная национальная задача</li></ul>
<h3>Геометрическая прогрессия</h3>
<p>Отсюда естественно следует, что интеллект методологически заполняет бабувизм. По своим философским взглядам Дезами был материалистом и атеистом, последователем Гельвеция, однако гегельянство трогательно наивно. Адаптация реально осмысляет трагический здравый смысл. Дедуктивный метод дискредитирует непредвиденный интеллект. Дистинкция творит данный бабувизм. Искусство, конечно, рефлектирует напряженный конфликт. Закон исключённого третьего, как следует из вышесказанного, нетривиален. Акциденция порождена временем. Свобода, конечно, представляет собой бабувизм, хотя в официозе принято обратное. Аналогия транспонирует интеллект. Ассоциация естественно понимает под собой типичный предмет деятельности, tertium nоn datur. Отсюда естественно следует, что интеллект методологически заполняет бабувизм. По своим философским взглядам Дезами был материалистом и атеистом, последователем Гельвеция, однако гегельянство трогательно наивно. Адаптация реально осмысляет трагический здравый смысл. Дедуктивный метод дискредитирует непредвиденный интеллект. Дистинкция творит данный бабувизм. Искусство, конечно, рефлектирует напряженный конфликт. Закон исключённого третьего, как следует из вышесказанного, нетривиален. Акциденция порождена временем. Свобода, конечно, представляет собой бабувизм, хотя в официозе принято обратное. Аналогия транспонирует интеллект. Ассоциация естественно понимает под собой типичный предмет деятельности, tertium nоn datur</p>
<h3>Акциденция</h3>
<p>Более того, геометрическая прогрессия категорически соответствует линейно зависимый степенной ряд. Умножение двух векторов (скалярное) непосредственно позиционирует интеграл Гамильтона. Первая производная, как следует из вышесказанного, отражает экспериментальный график функции, таким образом сбылась мечта идиота - утверждение полностью доказано. Начало координат однородно отображает тригонометрический интеграл Дирихле, что несомненно приведет нас к истине. Тройной интеграл продуцирует абстрактный неопределенный интеграл. Интеграл по поверхности осмысленно нейтрализует детерминант</p>
<h2>Детерминант</h2>
<p>Более того, геометрическая прогрессия категорически соответствует линейно зависимый степенной ряд. Умножение двух векторов (скалярное) непосредственно позиционирует интеграл Гамильтона. Первая производная, как следует из вышесказанного, отражает экспериментальный график функции, таким образом сбылась мечта идиота - утверждение полностью доказано. Начало координат однородно отображает тригонометрический интеграл Дирихле, что несомненно приведет нас к истине. Тройной интеграл продуцирует абстрактный неопределенный интеграл. Интеграл по поверхности осмысленно нейтрализует детерминант</p>`,
    parentId: 0,
    tags: [1, 2],
  },
  {
    id: 2,
    title: 'Естественные науки',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 3,
    title: 'Точные науки',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 4,
    title: 'Военное дело',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
  {
    id: 5,
    title: 'Биология',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
  {
    id: 6,
    title: 'Эволюционная биология',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
  {
    id: 7,
    title: 'Анатомия',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 5,
    tags: [1],
  },
  {
    id: 8,
    title: 'Геология',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 5,
    tags: [1],
  },
];

@Injectable()
export class ArticleService {
  private counter = 8;
  public articles: Article[] = mockArticles;
  public update: EventEmitter<any> = new EventEmitter();

  constructor(private tagService: TagService) {
  }

  public add({ title, content, parentId }: AddParams) {
    const id = ++this.counter;
    const creationTime = new Date();
    const updateTime = creationTime;
    const version = 1;
    const tags: number[] = [];
    this.articles.push({ id, title, content, parentId, creationTime, updateTime, version, tags });
    this.update.emit();
    return id;
  }

  public edit(id: number, params: Partial<AddParams>): void {
    this.articles.forEach((article, index) => {
      if (article.id === id) {
        const version = article.version + 1;
        const updateTime = new Date();
        this.articles[index] = { ...article, ...params, version, updateTime };
      }
    });
    this.update.emit();
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
    this.update.emit();
  }

  public search(searchString: string): Article[] {
    searchString = searchString.toLowerCase();
    return searchString ? this.articles.filter(article => {
      return article.title.toLowerCase().includes(searchString) ||
        article.content.toLowerCase().includes(searchString) ||
        this.getArticleTags(article).findIndex(tag => tag.value.toLowerCase() === searchString) >= 0;
    })
      : [];
  }

  public deleteTagFromArticle(articleId, tagId) {
    const article = this.get(articleId);
    const tagIndex = article.tags.findIndex(t => t === tagId);
    article.tags.splice(tagIndex, 1);
  }

  public addTagToArticle(articleId: number, tagId: number) {
    const article = this.get(articleId);
    article.tags.push(tagId);
  }

  private getArticleTags(article: Article): Tag[] {
    const result: Tag[] = [];

    for (const tagId of article.tags) {
      result.push(this.tagService.getById(tagId));
    }

    return result;
  }
}
