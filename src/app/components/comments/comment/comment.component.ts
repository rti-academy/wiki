import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '@app/models/comment';
import { FormControl } from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
  }

  public delete() {
    console.log(`delete ${this.comment.id}`);
  }

  public edit() {
    this.editing = true;
    this.commentTextField.setValue(this.comment.text);
  }

  public save() {
    this.editing = false;
    this.comment.text = this.commentTextField.value; // TODO: Send to backend
  }
}
