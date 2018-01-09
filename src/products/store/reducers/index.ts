import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState, reducer, getPizzasEntities, getPizzasLoaded, getPizzasLoading } from './pizzas.reducers';

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

export const getAllPizzasEntities = createSelector(getPizzaState, getPizzasEntities);
export const getAllPizzas = createSelector(
  getAllPizzasEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
)
export const getAllPizzasLoading = createSelector(getPizzaState, getPizzasLoading);
export const getAllPizzasLoaded = createSelector(getPizzaState, getPizzasLoaded);
