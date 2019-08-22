import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Comment } from '@app/models/comment';
import { FormControl } from '@angular/forms';
import { CommentsService } from '@app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  public menuUp = false;
  public commentHover = false;
  public editing = false;
  public commentTextField = new FormControl();

  @Input()
  public comment: Comment;

  @Output()
  public commentDelete = new EventEmitter();

  constructor(
    private commentService: CommentsService
  ) {
  }

  ngOnInit() {
  }

  public delete() {
    this.commentService.delete(this.comment.id)
      .subscribe(() => this.commentDelete.emit(this.comment));
  }

  public edit() {
    this.editing = true;
    this.commentTextField.setValue(this.comment.text);
  }

  public save() {
    this.editing = false;
    this.comment.text = this.commentTextField.value;
    this.commentService.edit(this.comment)
      .subscribe(() => {});
  }
}
