const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        identification_number: { type: Number, required: true, trim: true, unique: true },
        phone: { type: Number },
        role: { type: String, required: true, trim: true, default: 'user' },
        password: { type: String, required: true, trim: true },
        token: { type: String, trim: true },
        status: { type: String, required: true, trim: true, default: "active" },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);

userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}
module.exports = model("Users", userSchema);