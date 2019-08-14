import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '@app/services/comments.service';
import { Comment } from '@app/models/comment';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    public comments: Comment[];

    public commentText = '';

    @Input()
    public articleId: number;

    constructor(private commentService: CommentsService) {
    }

    ngOnInit() {
        this.comments = this.commentService.getCommentsByArticleId(this.articleId);
    }

    addComment() {

        this.commentService.add({
            articleId: this.articleId,
            text: this.commentText
        });

        this.comments = this.commentService.getCommentsByArticleId(this.articleId);

        this.resetCommentField();
    }

    private resetCommentField() {
        this.commentText = '';
    }

    public getCommentCaption() {
        const variants: string[] = ['комментарий', 'комментария', 'комментариев'];
        const lastTenDigits = Math.abs(this.comments.length) % 100;
        const lastDigit = lastTenDigits % 10;
        if (lastTenDigits > 10 && lastTenDigits < 20) { return variants[2]; }
        if (lastDigit > 1 && lastDigit < 5) { return variants[1]; }
        if (lastDigit === 1) { return variants[0]; }
        return variants[2];
    }
}
