import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

interface ResponseData {
  message: string;
  posts: any[];
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http
      .get<ResponseData>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  getPost(postId: string | null): Post {
    const post = { ...this.posts.find((post) => post.id === postId) } as Post;
    return post;
  }

  addPost(title: string, content: string): void {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((response) => {
        post.id = response.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string | null): void {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(postId: string | null, title: string, content: string) {
    const post: Post = { id: postId, title: title, content: content };
    console.log(postId);
    this.http
      .put('http://localhost:3000/api/posts/' + postId, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
