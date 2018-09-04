import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Router } from '@angular/router';
import { IArticle } from 'app/shared/model/article.model';
import { Principal } from 'app/core';
import { ArticleService } from './article.service';
import { LocalDataSource } from '../../../../../../node_modules/ng2-smart-table';

@Component({
    selector: 'jhi-article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
    articles: IArticle[];
    currentAccount: any;
    eventSubscriber: Subscription;
    settings = {
        add: { addButtonContent: 'Create new article' },
        actions: {
            edit: false,
            delete: false,
            custom: [
                {
                    name: 'view',
                    title: 'View '
                },
                {
                    name: 'edit',
                    title: 'Edit '
                },
                {
                    name: 'delete',
                    title: 'Delete '
                },
                {
                    name: 'duplicate',
                    title: 'Duplicate '
                }
            ]
        },
        mode: 'external',

        columns: {
            id: {
                title: 'ID',
                editable: false
            },
            name: {
                title: 'Name'
            },
            articleNumber: {
                title: 'ArticleNumber'
            },
            price: {
                title: 'Price'
            }
        }
    };

    data: LocalDataSource;

    constructor(
        private articleService: ArticleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.articleService.query().subscribe(
            (res: HttpResponse<IArticle[]>) => {
                this.articles = res.body;
                this.data = new LocalDataSource(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInArticles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IArticle) {
        return item.id;
    }

    registerChangeInArticles() {
        this.eventSubscriber = this.eventManager.subscribe('articleListModification', response => this.loadAll());
    }
    addNew() {
        console.log('dodat novi artical');
        this.router.navigate(['article/new']);
    }

    onCustom(event) {
        if (event.action === 'viev') {
            this.router.navigate(['article/' + event.data.id + '/edit']);
        } else if (event.action === 'edit') {
            this.router.navigate(['article/' + event.data.id + '/edit']);
        } else {
            this.router.navigate([{ outlets: { popup: 'article/' + event.data.id + '/delete' } }]);
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
