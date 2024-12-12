const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    provider: { type: String, required: true },
    role: {
        type: String,
        enum: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
        default: "TEAM_MEMBER",
    },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
const User = mongoose.model("user", UserSchema);
module.exports = User;
