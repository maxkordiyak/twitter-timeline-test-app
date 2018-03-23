const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    twitterProvider: {
        type: {
            id: String,
            token: String
        }
    }
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    var that = this;
    return this.findOne({
        'twitterProvider.id': profile.id
    }, function(err, user) {
        if (!user) {
            var newUser = new that({
                email: profile.emails[0].value,
                twitterProvider: {
                    id: profile.id,
                    token: token,
                    tokenSecret: tokenSecret
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
