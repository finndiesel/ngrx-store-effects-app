import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState, reducer, getPizzas, getPizzasLoaded, getPizzasLoading } from './pizzas.reducers';

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer,
}

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
)

export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
)

export const getAllPizzas = createSelector(getPizzaState, getPizzas)
export const getAllPizzasLoading = createSelector(getPizzaState, getPizzasLoading)
export const getAllPizzasLoaded = createSelector(getPizzaState, getPizzasLoaded)
