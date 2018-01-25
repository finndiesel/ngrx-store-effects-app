import { createSelector } from '@ngrx/store';
import { getProductsState, ProductsState, ToppingsState } from '../reducers';

export const getToppingsState = createSelector(
  getProductsState,
  (state: ProductsState) => state.toppings
);

export const getAllToppingsEntities = createSelector(
  getToppingsState,
  (state: ToppingsState) => state.entities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  (state: ToppingsState) => state.selectedToppings
);

export const getAllToppings = createSelector(
  getAllToppingsEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
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
