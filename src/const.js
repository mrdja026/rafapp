import moment from 'moment';

export const dateFormat = (timestamp) => {
    return moment(new Date(timestamp)).format('DD/MM/YYYY');
}

export const FOOD_TYPE = 'Food';
export const TECH_TYPE = 'Tech';
export const LIFESTYLE_TYPE = 'Lifestyle';