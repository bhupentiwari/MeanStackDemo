import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient) {

}
getPost() {

   this.http.get<Post[]>('http://localhost:3000/api/post')
    .subscribe((d) => {
      this.posts = d;
      this.postsUpdated.next([...this.posts]);
    });
 // return [...this.posts];

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

