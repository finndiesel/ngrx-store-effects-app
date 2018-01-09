import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { PizzasService } from '../../services';
import * as pizzaActions from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

@Injectable()
export class PizzasEffect {
  constructor(private actions$: Actions, private pizzaService: PizzasService) { }

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas()
          .pipe(
            map((pizzas: Pizza[]) => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
          );
      })
    );
}
