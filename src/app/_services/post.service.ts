import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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

   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/post')
    .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
    }))
    .subscribe((tranformedObject) => {
      this.posts = tranformedObject;
      this.postsUpdated.next([...this.posts]);
    });
 // return [...this.posts];

}



getPostUpdateListner() {
  return this.postsUpdated.asObservable();
}

addPost(tit: string, con: string) {
  const post: Post = { id: null, title : tit, content : con};
  this.http.post<{message: string}>('http://localhost:3000/api/post', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
}

deletePost(postId: string) {
  this.http.delete('http://localhost:3000/api/post/' + postId)
    .subscribe(() => {
      console.log('Deleted Successfully');
    });
}
}

