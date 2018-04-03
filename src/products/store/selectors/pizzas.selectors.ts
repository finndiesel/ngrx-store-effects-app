import { createSelector } from '@ngrx/store';

import {
  getPizzasEntities, getPizzasLoaded, getPizzasLoading, getProductsState,
  ProductsState
} from '../reducers';
import { getRouterState } from '../../../app/store/reducers';
import { Pizza } from '../../models/pizza.model';
import { getSelectedToppings, getToppingsEntities } from './toppings.selectors';

export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getAllPizzasEntities = createSelector(getPizzaState, getPizzasEntities);

export const getAllPizzas = createSelector(
  getAllPizzasEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getAllPizzasLoading = createSelector(getPizzaState, getPizzasLoading);

export const getAllPizzasLoaded = createSelector(getPizzaState, getPizzasLoaded);

export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  getToppingsEntities,
  getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return {
      ...pizza, toppings
    };
  }
);
