import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../_services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postMode = 'create';
  postId: string;
  post: Post;
  isLoading = false;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    if (this.postId == null) {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
       this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
  ngOnInit() {
   this.route.paramMap.subscribe((pMap: ParamMap) => {
    if (pMap.has('postId')) {
      this.postMode = 'edit';
      this.postId = pMap.get('postId');
        //
      this.isLoading = true;

      this.postService.getPostById(this.postId).subscribe(postData => {
        //
        this.isLoading = false;
        this.post = {id: postData._id, title: postData.title, content: postData.content};
      });
     // console.log(this.post);
    } else {
      this.postId = null;
      this.postMode = 'create';
    }
   });
  }

}
