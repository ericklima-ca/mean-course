import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: "First", content: "The first posts"},
  //   {title: "Second", content: "The second posts"},
  //   {title: "Third", content: "The third posts"},
  // ]
  @Input()
  posts: Post[] = [];
  private postsSub = new Subscription();

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string | null) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
