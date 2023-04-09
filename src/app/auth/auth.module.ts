import { NgModule } from '@angular/core';

import {AuthComponent} from './auth.component';
import {TelegramLoginComponent} from './components/telegram-login/telegram-login.component';


@NgModule({
  declarations: [
    AuthComponent,
    TelegramLoginComponent,
  ],
  imports: [],
  providers: [],
})
export class AuthModule {
}
