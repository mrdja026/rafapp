import { combineReducers } from 'redux';
import { FOOD_FETCH_START, FOOD_FETCH_END, FOOD_FETCH_ERROR, FOOD_SET_FILTER, FOOD_CLEAR_FILTER } from './actionCreator';

_isEmpty = (obj) => {
    return Object.keys(obj).length > 0;
}

const initState = {
    loading: false,
    items: [],
    skip: 0,
    take: 40,
    queryObject: {
    },
    sortBy: {},
    hasErrors: false,
    errorMessage: '',
    total: 0,
}

food = (state = initState, action) => {
    console.log('Action received', action);
    switch (action.type) {
        case FOOD_FETCH_START: {
            return {
                ...state,
                loading: true,
                skip: !_isEmpty(state.queryObject) ? 0 : state.skip,
                items: !_isEmpty(state.queryObject) ? [] : state.items
            };
        }
        case FOOD_FETCH_END: {
            return {
                ...state, items: [...state.items, ...action.data.items],
                skip: state.skip + action.data.items.length,
                hasErrors: false,
                loading: false,
                errorMessage: '',
                total: action.data.total
            };
        }
        case FOOD_FETCH_ERROR: {
            return { ...state, hasErrors: true, errorMessage: action.data };
        }
        case FOOD_SET_FILTER: {
            return state;
        }
        case FOOD_CLEAR_FILTER: {
            return state;
        }
        default:
            return state;
    }
}

export default combineReducers({ food });

//reducer template;
// import { combineReducers } from 'redux';
// import { FOOD_FETCH_START, FOOD_FETCH_END, FOOD_FETCH_ERROR, FOOD_SET_FILTER, FOOD_CLEAR_FILTER } from './actionCreator';

// const initState = {
//     loading: true,
//     items: [],
//     skip: 0,
//     take: 40,
//     queryObject: {
//     },
//     sortBy: {}
// }

// food = (state = initState, action) => {
//     switch (action.type) {
//         case FOOD_FETCH_START: {
//             return state;
//         }
//         case FOOD_FETCH_END: {
//             return state;
//         }
//         case FOOD_FETCH_ERROR: {
//             return state;
//         }
//         case FOOD_SET_FILTER: {
//             return state;
//         }
//         case FOOD_CLEAR_FILTER: {
//             return state;
//         }
//         default:
//             return state;
//     }
// }

// export default combineReducers(food);