import { PizzasAction, LOAD_PIZZAS, LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS } from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  data: Pizza[],
  loaded: boolean,
  loading: boolean,
}

export const initState: PizzaState = {
  data: [{
    "name": "Everything!",
    "toppings": [
      {
        "id": 6,
        "name": "mushroom"
      },
      {
        "id": 7,
        "name": "olive"
      },
      {
        "id": 2,
        "name": "bacon"
      },
      {
        "id": 3,
        "name": "basil"
      },
      {
        "id": 1,
        "name": "anchovy"
      },
      {
        "id": 8,
        "name": "onion"
      },
      {
        "id": 11,
        "name": "sweetcorn"
      },
      {
        "id": 9,
        "name": "pepper"
      },
      {
        "id": 5,
        "name": "mozzarella"
      },
      {
        "id": 10,
        "name": "pepperoni"
      },
      {
        "id": 12,
        "name": "tomato"
      },
      {
        "id": 4,
        "name": "chili"
      }
    ],
    "id": 2
  },],
  loaded: false,
  loading: false,
}

export function reducer(
  state = initState,
  action: PizzasAction,
): PizzaState {
  switch(action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      }
    }

    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      }
    }
  }
  return state;
}

export const getPizzas = (state: PizzaState) => state.data;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
