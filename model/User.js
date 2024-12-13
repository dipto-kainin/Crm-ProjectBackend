import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            enum: ["EMAIL", "PHONE_NUMBER"],
            required: true,
        },
        role: {
            type: String,
            enum: ["ADMIN", "MANAGER", "TEAM_MEMBER"],
            default: "TEAM_MEMBER",
        },
        profileImage: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};
export const User = mongoose.model("user", UserSchema);
