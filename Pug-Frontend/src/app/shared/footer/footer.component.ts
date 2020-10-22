import { Component } from '@angular/core';

declare var $: any;

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    test: Date = new Date();
}
