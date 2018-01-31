import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Array<Article>;

  constructor(private _articleService: ArticleService, private router: Router, private aR: ActivatedRoute) { }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id = params['id'];

      this._articleService.getArticle(id)
        .subscribe(res => this.article = res);
    });
  }

  deleteArticle(articleId) {
    this._articleService.deleteArticle(articleId)
      .subscribe(res => {
        this.router.navigateByUrl('/');
      })
  }

}
