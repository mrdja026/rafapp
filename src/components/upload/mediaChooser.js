import ImagePicker from 'react-native-image-picker';
export const choseMedia = async (options) => {
    let promise = new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                resolve({ ok: true, userCanceled: true });
            } else if (response.error) {
                reject({ ok: false, error: response.error });
            } else {
                resolve({
                    ok: true,
                    error: null,
                    userCanceled: false,
                    responseData: response,
                });
            }
        })
    });
    return promise;
}