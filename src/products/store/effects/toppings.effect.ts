import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ToppingsService } from '../../services';
import { LOAD_TOPPINGS, LoadToppingsFail, LoadToppingsSuccess } from '../actions';
import { Topping } from '../../models/topping.model';

@Injectable()
export class ToppingsEffect {
  constructor(private actions$: Actions, private toppingsService: ToppingsService) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(LOAD_TOPPINGS)
    .pipe(
      switchMap( () => {
        return this.toppingsService.getToppings()
          .pipe(
            map( (toppings: Topping[]) => new LoadToppingsSuccess(toppings) ),
            catchError( error => of(new LoadToppingsFail(error)))
          );
        }
      )
    );
}
