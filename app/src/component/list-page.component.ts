import { ViewChild } from '@angular/core';
import { Entity } from '../model/entity';
import { TService } from '../service/service';
import { Pagination } from '../entity/pagination';

export abstract class ListPageComponent<TEntity extends Entity> {
    protected entities: TEntity[];
    protected pageIndex: number = 1;
    protected pageSize: number = 10;
    protected pageNumberSize: number = 5;
    protected total: number = 0;

    constructor(private modelService: TService<TEntity>) {
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
        this.modelService.queryByPagination(pagination).then(result => {
            this.total = result.total;
            this.entities = result.data;
        });
    }

    protected remove(guid) {
        if (confirm("确认删除？") === true) {
            this.modelService.deleteByPk(guid).then(result => {
                this.query();
            });
        }
    }
}