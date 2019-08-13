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
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                ' Ut egestas justo vel orci tempor, sit amet ornare tortor mattis.',
            },
            {
                id: this.incrementCounter(),
                articleId: 1,
                publishDate: new Date(),
                text: 'Sed lectus lectus, tincidunt non odio at, sollicitudin dapibus ligula.',
            },
            {
                id: this.incrementCounter(),
                articleId: 1,
                publishDate: new Date(),
                text: 'Integer scelerisque pharetra sem in scelerisque. Donec luctus eu erat a consequat.',
            },
        ];
    }

    private incrementCounter(): number {
        return ++this.counter;
    }
}
