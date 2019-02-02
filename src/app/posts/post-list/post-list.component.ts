import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../_models/post';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSubscription = new Subscription();
  isLoading = false;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost();
    this.postSubscription =  this.postService.getPostUpdateListner()
      .subscribe((post: Post[]) => {
        this.posts = post;
      });
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
  onDelete(postID: string) {
    this.postService.deletePost(postID);
  }
}
