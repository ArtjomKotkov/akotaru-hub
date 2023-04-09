import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {AuthService} from "../../../core/state";


@Component({
    selector: 'ah-telegram-login',
    template: `
        <div #script [style.display]="'None'">
            <ng-content></ng-content>
        </div>`,
    styleUrls: ['./telegram-login.component.scss']
})
export class TelegramLoginComponent implements AfterViewInit {
    constructor(
        private authService: AuthService,
    ) {}

    // @ts-ignore
    @ViewChild('script', {static: true}) script: ElementRef;

    convertToScript() {
        const element = this.script.nativeElement;
        const script = document.createElement('script');

        script.src = 'https://telegram.org/js/telegram-widget.js?5';
        script.setAttribute('data-telegram-login', 'akohub_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-onauth', 'loginViaTelegram(user)');
        script.setAttribute('data-request-access', 'write');
        element.parentElement.replaceChild(script, element);
    }

    ngAfterViewInit() {
        this.authService.boundWidget();
        this.convertToScript();
    }
}
