import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

getPost() {
  return [...this.posts];
}

getPostUpdateListner() {
  return this.postsUpdated.asObservable();
}

addPost(tit: string, con: string) {
  const post: Post = {title : tit, content : con};
  this.posts.push(post);
  this.postsUpdated.next([...this.posts]);
}
}

