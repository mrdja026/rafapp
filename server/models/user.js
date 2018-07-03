import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { HTTP_RA_EXCEPTION } from '../utls/apiUtils';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstLogin: {
        type: Boolean,
    },
    bio: {
        type: String,
    },
    avatarUri: {
        type: String,
    }
    // passwordConf: {
    //     type: String,
    //     required: true,
    // }
});

UserSchema.statics.authenticate = (username, password, callback) => {
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

UserSchema.statics.updateById = (userData, callback) => {
    if (!userData.id) {
        let err = new Error('User id not valid');
        err.status = HTTP_RA_EXCEPTION;
        return callback(err);
    }
    User.findById(id)
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error('User not found');
                err.status = HTTP_RA_EXCEPTION;
                return callback(err);
            }
            delete userData.id;
            if (userData.avatarUri.length <= 0) {
                delete userData.avatarUri;
            }
            user = Object.assign(user, userData);
            user.save(function (err, updated) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, updated);
                }
            });
        });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        user.firstLogin = true;
        next();
    })
});

const User = mongoose.model('User', UserSchema);
export default User; 