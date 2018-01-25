import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzaState, pizzaReducer } from './pizzas.reducers';
import { ToppingsState, toppingsReducer } from './toppings.reducers';

export interface ProductsState {
  pizzas: PizzaState;
  toppings: ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzaReducer,
  toppings: toppingsReducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);

export * from './pizzas.reducers';
export * from './toppings.reducers';
