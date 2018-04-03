import { createSelector } from '@ngrx/store';
import { getProductsState, ProductsState, ToppingsState } from '../reducers';
import * as fromToppings from '../reducers/toppings.reducers';

export const getToppingsState = createSelector(
  getProductsState,
  (state: ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingsEntities
);

export const getAllToppingsEntities = createSelector(
  getToppingsState,
  (state: ToppingsState) => {
    console.log(state);
    return state.entities;
  }
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  (state: ToppingsState) => state.selectedToppings
);

export const getAllToppings = createSelector(
  getToppingsEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id,10)])
  }
);

export const getAllToppingsLoading = createSelector(
  getToppingsState,
  (state: ToppingsState) => state.loading
);

export const getAllToppingsLoaded = createSelector(
  getToppingsState,
  (state: ToppingsState) => state.loaded
);

// export const getSelectedTopping = createSelector(
//   getAllToppingsEntities,
//   (entities: { [key: number]: Topping } ) =>
// );
