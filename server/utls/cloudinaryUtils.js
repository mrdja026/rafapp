import cloudinary from 'cloudinary';

export const uploadAsset = (data, type, callback) => {
    cloudinary.v2.uploader.upload(data, function (error, result) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, result);
        }
    });
}