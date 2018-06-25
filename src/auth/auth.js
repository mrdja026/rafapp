import firebase from "react-native-firebase";


const authManager = {
}

this.user = {
}

authManager.init = () => {
}


authManager.setUser = (user) => {
    this.user = user;
}

authManager.getUser = () => {
    return this.user;
}
authManager.onAuthChanged = () => {
    return this.onAuthChanged;
}

// setAuthChangedListener = (func) => {
//     this.onAuthChanged = func;
// }

export default authManager;