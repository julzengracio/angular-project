import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  article: Article;
  articleFrm: FormGroup;
  articles: Array<Article>;

  constructor(private _articleService: ArticleService, 
              private router: Router, 
              private aR: ActivatedRoute, 
              private fb: FormBuilder) { }

  ngOnInit() {
    this._articleService.getArticles()
      .subscribe(res => this.articles = res);

    this.aR.params.subscribe((params) => {
      if (params['id']) {
        this._articleService.getArticle(params['id'])
          .subscribe(res => {
            this.article = res;

            this.articleFrm = this.fb.group({
              'title' : ['Test title'],
              'content' : ['Test content'],
            });
        });
      } else {
        this.articleFrm = this.fb.group({
          'title' : ['Test title'],
          'content' : ['Test content'],
        });
      }
    })

    this.articleFrm = this.fb.group({
      'title' : ['Test title'],
      'content' : ['Test content'],
    });
  }

  addArticle(articleId, article: Article) {

    if (articleId !== undefined) {
      this._articleService.updateArticle(article, articleId._id)
        .subscribe(updateArticle => {
          this.router.navigateByUrl('/');
        })
    } else {
      this._articleService.insertTestArticle(article)
        .subscribe(newArticle => {
          this.articles.push(newArticle);
          this.router.navigateByUrl('/');
      })
    }
  }
}
