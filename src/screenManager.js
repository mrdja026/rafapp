import { Dimensions } from 'react-native';

export const getWidth = () => {
    return Dimensions.get('window').width;
}

export const getHeight = () => {
    return Dimensions.get('window').height;
}

export const getDimensions = () => {
    return { width: getWidth(), height: getHeight() }
}