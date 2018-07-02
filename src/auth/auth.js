import { saveStorageItem } from "../storage";

export const USER_DATA = '@USER_DATA';

const authManager = {
}

this.user = {
    logedIn: false,
}

authManager.init = () => {
}


authManager.setUser = (user) => {
    this.user = user;
    saveStorageItem(USER_DATA, user);
}

authManager.getUser = () => {
    return this.user;
}
// authManager.onAuthChanged = () => {
//     return this.onAuthChanged;
// }

// setAuthChangedListener = (func) => {
//     this.onAuthChanged = func;
// }

export default authManager;