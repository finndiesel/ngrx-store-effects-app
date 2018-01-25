import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ProductsState } from '../../store/reducers';
import { getPizzaVisualised, getSelectedPizza } from '../../store/selectors';
import { LoadToppings, VisualizeToppings } from '../../store/actions';
import { getAllToppings } from '../../store/selectors/toppings.selectors';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(
    private store: Store<ProductsState>,

  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(getSelectedPizza);
    this.toppings$ = this.store.select(getAllToppings);
    this.visualise$ = this.store.select(getPizzaVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {

  }

  onUpdate(event: Pizza) {

  }

  onRemove(event: Pizza) {

  }
}
