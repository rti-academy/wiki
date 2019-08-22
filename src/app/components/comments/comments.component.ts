import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommentsService } from '@app/services/comments.service';
import { Comment } from '@app/models/comment';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges {

    public comments: Comment[] = [];

    public commentText = '';

    @Input()
    public articleId: number;

    constructor(private commentService: CommentsService) {
    }

    ngOnChanges(): void {
        this.comments = [];
        this.updateComments();
    }

    public addComment() {
        if (this.commentText) {
            this.commentService.add({
                articleId: this.articleId,
                text: this.commentText
            }).subscribe(this.updateComments);

            this.resetCommentField();
        }
    }

    public getCommentCaption(): string {
        const variants: string[] = ['комментарий', 'комментария', 'комментариев'];
        const lastTenDigits = Math.abs(this.comments.length) % 100;
        const lastDigit = lastTenDigits % 10;
        if (lastTenDigits > 10 && lastTenDigits < 20) { return variants[2]; }
        if (lastDigit > 1 && lastDigit < 5) { return variants[1]; }
        if (lastDigit === 1) { return variants[0]; }
        return variants[2];
    }

    public handleCommentDelete(deletedComment: Comment) {
        const index = this.comments.findIndex(c => c.id === deletedComment.id);
        this.comments.splice(index, 1);
    }

    private updateComments = () => {
        this.commentService.getCommentsByArticleId(this.articleId)
            .subscribe(comments => this.comments = comments);
    }

    private resetCommentField() {
        this.commentText = '';
    }
}
