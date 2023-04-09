import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {AuthModule} from "./auth/auth.module";
import {AuthService, CurrentUserService, GlobalSettingsService} from "./core";


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true,
            deps: [
                GlobalSettingsService,
                AuthService,
                CurrentUserService,
            ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

function initializeApp(
    globalSettingsService: GlobalSettingsService,
    authService: AuthService,
    currentUserService: CurrentUserService,
) {
    return () => {
        console.log('inti app')
        globalSettingsService.init();
        authService.init();
        currentUserService.init();
    }
}
