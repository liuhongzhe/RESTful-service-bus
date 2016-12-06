import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'text-search',
    templateUrl: '../../template/common/text-search.html',
    styleUrls: ['../../assets/css/common/text-search.css']
})
export class TextSearchComponent {
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    text: string;

    passwordKeyUp(e) {
        if (e.which === 13) {
            this.invokeSearch();
        }
    }

    invokeSearch() {
        var text = '';
        if (this.text) {
            text = this.text;
        }
        this.search.emit(text);
    }

    resetSearch() {
        this.text = null;
        this.invokeSearch();
    }
}