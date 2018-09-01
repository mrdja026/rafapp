import Toast from 'react-native-root-toast';
export const showToast = ({ message, duration = Toast.durations.SHORT, backgroundColor }) => {
    Toast.show(message, {
        duration: duration,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: backgroundColor,
    });
}
