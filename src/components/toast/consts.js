import Toast from "react-native-root-toast";
const defaultErrorMessage = 'Ooops, something went wrong...'
export const errorToast = (message = defaultErrorMessage, duration = Toast.durations.SHORT) => {
    return {
        message: message,
        duration: duration,
        backgroundColor: 'red'
    }
}

export const infoToast = (message, duration = Toast.durations.SHORT) => {
    return {
        message: message,
        duration: duration,
        backgroundColor: 'green'
    }
}

export const warningToast = (message, duration = Toast.durations.SHORT) => {
    return {
        message: message,
        duration: duration,
        backgroundColor: 'orange'
    }
}