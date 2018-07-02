import { AsyncStorage } from 'react-native';



export const saveStorageItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
        return 1;
    } catch (error) {
        console.error('Storage set item error' + error);
    }
}

export const getStorageItem = async (key) => {
    try {
        let response = await AsyncStorage.getItem(key);
        if (response != null) {
            return JSON.parse(response);
        }
        return null;
    } catch (error) {
        console.error('Storage item get error', error);
    }
}