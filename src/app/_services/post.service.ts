import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../_models/post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

private posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient, private route: Router) {

}
getPost() {
   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
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
}

getPostUpdateListner() {
  return this.postsUpdated.asObservable();
}

getPostById(postId: string) {
 return   this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + postId);
}

addPost(tit: string, con: string) {
  const post: Post = { id: null, title : tit, content : con};
  console.log(post);
  this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.route.navigate(['/']);
      }, error => {
         console.log(error);
      });
}
updatePost(postId: string, title: string, content: string) {
  const post: Post = { id: postId, title : title, content : content};
  this.http.put('http://localhost:3000/api/posts/' + postId, post).subscribe(
    response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex  = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.route.navigate(['/']);
    }
  );
}

deletePost(postId: string) {
  this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      console.log('Deleted Successfully');
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts]);
    });
}
}

