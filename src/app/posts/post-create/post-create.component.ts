import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostService) { }

  onSubmitPost(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
  ngOnInit() {
  }

}
