import firebase, { Firebase } from "react-native-firebase";

class FirebaseManager {
    constructor() {
        this.hasPermissions = false;
        this.notificationListener = null;
        this.onNotificationDisplayedListener = null;
        this.notificationOpenedListener = null;
    }


    isEnabled = () => {
        return this.hasPermissions;
    }
    init = async () => {
        let promise = new Promise(async (resolve, reject) => {
            let _hasPermisions = null;
            try {
                _hasPermisions = firebase.messaging().hasPermission();
                this.notificationListener = firebase.notifications().onNotification((notification) => {
                    console.log('onNotification', notification)
                });
                this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
                    console.log('onNotificationOpened', notificationOpen);
                });
                this.onNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notificationDisplayed) => {
                    console.log('notification displayed', notificationDisplayed)
                });


                this.hasPermissions = true;
            } catch (error) {
                return reject(error);
            }
            if (_hasPermisions) {
                return resolve(true);
            } else {
                try {
                    let _reqPermisions = await this.requestPermissions();
                    return resolve(_reqPermisions);
                } catch (error) {
                    return reject(error);
                }
            }
        })
        return promise;
    }

    sendTestNotification = () => {
        const CHANNEL_ID = 'RAF_APP_ID'
        const notification = new firebase.notifications.Notification()
            .android.setChannelId(CHANNEL_ID)
            .android.setSmallIcon('ic_launcher')
            .setNotificationId('notificationId')
            .setTitle('My notification title')
            .setBody('My notification body')
            .setData({
                key1: 'value1',
                key2: 'value2',
            });
        firebase.notifications().displayNotification(notification)
    }

    destroy = () => {
        this.notificationListener();
        this.onNotificationDisplayedListener();
        this.notificationOpenedListener();
    }

    getInitialNotification = async () => {
        try {
            const notificationOpen = await firebase.notifications().getInitialNotification();
            if (notificationOpen) {
                console.log('App from backgroun/sleep', notificationOpen);
            }
        } catch (error) {
            throw Error(error);
        }
    }

    requestPermissions = async () => {
        try {
            await firebase.messaging().requestPermission();
            this.hasPermissions = true;
            return this.hasPermissions;
        } catch (error) {
            this.hasPermissions = false;
            return this.hasPermissions;
        }
    }
}

export default new FirebaseManager;