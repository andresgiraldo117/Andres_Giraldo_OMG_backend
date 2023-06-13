const { Schema, model } = require('mongoose');

const ProductsSchema = new Schema(
    {
        id_user: { type: Schema.Types.ObjectId, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        url_image: { type: String, required: true, trim: true },
        value: { type: Number, required: true, trim: true },
        rating: { type: Number, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false, 
    }
);


module.exports = model("Products", ProductsSchema);