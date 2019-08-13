import { Comment } from '@app/models/comment';

export class CommentsService {
    private comments: Comment[];

    constructor() {
        this.comments = this.getMockComments();
    }

    public add(comment: Comment) {
        this.comments.push(comment);
    }

    public delete(commentId: number) {
        const index = this.comments.findIndex(c => c.id === commentId);
        this.comments.splice(index, 1);
    }

    public getComments(): Comment[] {
        return this.comments;
    }

    public getCommentsByArticleId(articleId: number): Comment[] {
        return this.comments.filter(c => c.articleId === articleId);
    }

    public edit(comment: Comment) {
        const index = this.comments.findIndex(c => c.id === comment.id);
        this.comments[index] = comment;
    }

    private getMockComments(): Comment[] {
        return [
            {
                id: 1,
                articleId: 1,
                publishDate: new Date(),
                text: '',
            },
            {
                id: 2,
                articleId: 1,
                publishDate: new Date(),
                text: '',
            },
            {
                id: 3,
                articleId: 1,
                publishDate: new Date(),
                text: '',
            },
        ];
    }
}
