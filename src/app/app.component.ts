import { Component } from '@angular/core';
import { Post } from './_models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  storedPosts: Post[] = [];

  newPostCreated(post) {
    this.storedPosts.push(post);
  }
}
