import { OnInit } from '@angular/core';
import { Model } from '../model/model';
import { TService } from '../service/service';

export abstract class ListPageComponent<TEntity extends Model> implements OnInit {
    protected entities: TEntity[];
    protected pageIndex: number = 1;
    protected pageSize: number = 10;
    protected searchText: string;
    protected pageNumberSize: number = 5;
    protected total: number = 0;

    constructor(private modelService: TService<TEntity>) { }

    ngOnInit() {
        this.query();
    }

    protected query(pageIndex: number = null) {
        var pagination = {
            index: this.pageIndex,
            size: this.pageSize
        };
        if (pageIndex !== null) {
            pagination.index = pageIndex;
        }
        this.modelService.queryByTextAndPagination(this.searchText, {
            index: this.pageIndex,
            size: this.pageSize
        }).then(result => {
            this.total = result.total;
            this.entities = result.rows;
        });
    }

    protected onSaveCompleted(entity: TEntity) {
        this.query();
    }

    protected remove(guid) {
        if (confirm("确认删除？") === true) {
            this.modelService.deleteByPk(guid).then(result => {
                this.query();
            });
        }
    }
}