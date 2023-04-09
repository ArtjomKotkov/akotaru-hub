import {NgModule} from '@angular/core';
import {ProductComponent} from "./product/product.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ProductComponent,
    ],
    imports: [
        AsyncPipe,
        NgForOf,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        ProductComponent
    ]
})
export class CaloryModule {
}
