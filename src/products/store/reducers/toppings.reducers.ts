import { Topping } from '../../models/topping.model';
import {
  LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL, LOAD_TOPPINGS_SUCCESS, ToppingsAction,
  VISUALISE_TOPPINGS
} from '../actions';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

const initState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export function toppingsReducer(
  state = initState,
  action: ToppingsAction
): ToppingsState {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case LOAD_TOPPINGS_SUCCESS: {
      const payload = action.payload;
      const entities = payload.reduce(
        (toppings: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...toppings,
            [topping.id]: topping,
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings,
      };
    }
  }
  return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
