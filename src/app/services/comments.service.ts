import { Comment } from '@app/models/comment';

export interface AddParams {
    articleId: number;
    text: string;
}

export class CommentsService {
    private comments: Comment[];
    private counter = 0;

    constructor() {
        this.comments = this.getMockComments();
    }

    public add(params: AddParams): void {
        const id = this.incrementCounter();
        const publishDate = new Date();
        this.comments.push({ id, publishDate, ...params });
    }

    public delete(commentId: number): void {
        const index = this.comments.findIndex(c => c.id === commentId);
        this.comments.splice(index, 1);
    }

    public getComments(): Comment[] {
        return this.comments;
    }

    public getCommentsByArticleId(articleId: number): Comment[] {
        return this.comments.filter(c => c.articleId === articleId);
    }

    public edit(comment: Comment): void {
        const index = this.comments.findIndex(c => c.id === comment.id);
        this.comments[index] = comment;
    }

    private getMockComments(): Comment[] {
        return [
            {
                id: this.incrementCounter(),
                articleId: 1,
                publishDate: new Date(),
                text: 'Подскажите, пожалуйста, автора статьи',
            },
            {
                id: this.incrementCounter(),
                articleId: 1,
                publishDate: new Date(),
                text: 'Начало координат однородно отображает тригонометрический интеграл Дирихле, что несомненно приведет нас к истине.',
            },
            {
                id: this.incrementCounter(),
                articleId: 1,
                publishDate: new Date(),
                // tslint:disable-next-line:max-line-length
                text: 'Дистинкция творит данный бабувизм. Искусство, конечно, рефлектирует напряженный конфликт. Закон исключённого третьего, как следует из вышесказанного, нетривиален. Акциденция порождена временем. Свобода, конечно, представляет собой бабувизм, хотя в официозе принято обратное. Аналогия транспонирует интеллект.',
            },
        ];
    }

    private incrementCounter(): number {
        return ++this.counter;
    }
}
