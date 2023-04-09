import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, filter} from "rxjs";
import {CurrentUserRepository, Product, ProductService} from "../../../../core";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private currentUserRepo: CurrentUserRepository,
    ) {
    }

    products$ = new BehaviorSubject<Product[]>([]);

    form = new FormGroup({
        name: new FormControl(''),
        calories: new FormControl(),
        protein: new FormControl(),
        carbohydrate: new FormControl(),
        fat: new FormControl(),
    })

    async ngOnInit() {
        this.currentUserRepo.user$.pipe(filter(Boolean)).subscribe(async user => {
            console.log(user)
            this.products$.next(await this.productService.list({onwerId: user.id}));
        });
    }

    delete(id: string): void {
        this.productService.delete({id});
        this.products$.next(this.products$.getValue().filter(product => product.id != id));
    }

    async create(): Promise<void> {
        const createFields = this.form.value;
        const result = await this.productService.create({
            name: createFields.name!,
            calories: createFields.calories,
            protein: createFields.protein,
            carbohydrate: createFields.carbohydrate,
            fat: createFields.fat,
        });

        this.products$.next([result, ...this.products$.getValue()]);
    }
}
