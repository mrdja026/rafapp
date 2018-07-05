import { myFetch } from "../../api/utils";
import { GET_POST_SERVICE } from "../../api/api";

export const FOOD_FETCH_START = 'FOOD_FETCH_START';
export const FOOD_FETCH_END = 'FOOD_FETCH_END';
export const FOOD_FETCH_ERROR = 'FOOD_FETCH_ERROR';

export const FOOD_SET_FILTER = 'FOOD_SET_FILTER';
export const FOOD_CLEAR_FILTER = 'FOOD_CLEAR_FILTER';

export const getFoodData = () => {
    return async (dispatch, getState) => {
        let { food } = getState().food;
        if (food.loading) {
            return;
        } else {
            dispatch({ type: FOOD_FETCH_START });
            try {
                let { skip, take } = getState().food.food;
                let response = await myFetch(GET_POST_SERVICE, { method: 'POST' }, { category: 'Food', skip: skip, take: take });
                console.log('Food feed response', response);
                dispatch({ type: FOOD_FETCH_END, data: { items: response.items, total: 10, } });
            } catch (error) {
                dispatch({ type: FOOD_FETCH_ERROR, data: 'Error while fetching food feed data' });
            }
        }
    }
}