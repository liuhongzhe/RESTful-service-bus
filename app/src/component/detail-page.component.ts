import { Output, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import * as uuid from 'node-uuid';
import { Model } from '../model/model';
import { TService } from '../service/service';

export abstract class DetailPageComponent<TEntity extends Model> implements OnInit {
    protected isAdd: boolean;
    protected entity: TEntity;
    private detailModal: ModalDirective;
    private detailForm: NgForm;
    private detailSaveCompleted: EventEmitter<TEntity>;

    protected beforeGetEntity(guid: string): Promise<void> {
        return new Promise<void>(r => {
            r();
        });
    };

    protected abstract getModal(): ModalDirective;
    protected abstract getForm(): NgForm;
    protected abstract getSaveCompleted(): EventEmitter<TEntity>;

    constructor(private service: TService<TEntity>) { }

    ngOnInit() {
        this.detailModal = this.getModal();
        this.detailForm = this.getForm();
        this.detailSaveCompleted = this.getSaveCompleted();
    }

    protected show(guid: string) {
        this.detailModal.show();
        this.beforeGetEntity(guid).then(() => {
            if (guid === null) {
                this.isAdd = true;
                this.entity = Object.create<TEntity>(null);
            }
            else {
                this.isAdd = false;
                this.service.queryByPk(guid).then(r => {
                    this.entity = r;
                });
            }
        });
    }

    protected close() {
        this.detailModal.hide();
        this.entity = null;
    }

    protected onSubmit() {
        if (this.isAdd === true) {
            this.entity.guid = uuid.v1();
            this.service.add(this.entity).then(result => {
                this.close();
                this.detailSaveCompleted.emit(this.entity);
            });
        }
        else {
            this.service.update(this.entity).then(result => {
                this.close();
                this.detailSaveCompleted.emit(this.entity);
            });
        }
    }

    protected cancel() {
        this.close();
    }
}