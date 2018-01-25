import { PizzasAction, LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS } from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza};
  loaded: boolean;
  loading: boolean;
}

const initState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function pizzaReducer(
  state = initState,
  action: PizzasAction,
): PizzaState {
  switch(action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      const entities = pizzas.reduce(
        (pizzas: { [id: number]: Pizza}, pizza: Pizza) => {
          return {
            ...pizzas,
            [pizza.id]: pizza,
          };
        },
        {
          ...state.entities
        }
      )


      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
  }
  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
