import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { PizzasService } from '../../services';
import * as pizzaActions from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

import * as fromRoot from '../../../app/store';

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

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map( (action: pizzaActions.CreatePizza) => action.payload ),
      switchMap( (pizza) => {
        return this.pizzaService.createPizza(pizza)
          .pipe(
            map( (newPizza) => new pizzaActions.CreatePizzaSuccess(newPizza) ),
            catchError( (error) => of(new pizzaActions.CreatePizzaFail(error)) )
          );
      })
    );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.CREATE_PIZZA_SUCCESS,
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      // map( (action: pizzaActions.CreatePizzaSuccess) => action.payload ),
      map( () => new fromRoot.Go({ path: ['/products'] } ) )
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map( (action: pizzaActions.UpdatePizza) => action.payload ),
      switchMap( (pizza) => {
        return this.pizzaService.updatePizza(pizza)
          .pipe(
            map( (updatedPizza) => new pizzaActions.UpdatePizzaSuccess(updatedPizza)),
            catchError( (error) => of(new pizzaActions.UpdatePizzaFail(error)) )
          );
      })
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap( pizza => {
        return this.pizzaService.removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError( (error) => of(new pizzaActions.RemovePizzaFail(error)) )
          );
      })
    );
}
