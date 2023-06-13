const Products = require('../models/Products');
const Boom = require('@hapi/boom');

class ClassProducts {

    static async register(user, data, file) {
        let newProduct = new Products({
            ...data,
            id_user: user._id
        });
        await newProduct.save();
        return { message: 'Register success', status: 200, newProduct };
    };

    static async getAll(user) {
        let products = await Products.aggregate([
            {
                $match: { id_user: user._id }
            },
            {
                $lookup: {
                    pipeline: [
                        { $project: { identification_number: 0, password: 0, createdAt: 0, updatedAt: 0, token: 0 } },
                    ],
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: { id_user: 0, updatedAt: 0 }
            }
        ]);

        for (const ele of products) {
            ele.createdAt = ele.createdAt.toLocaleDateString();
        }

        if (products.length === 0) throw Boom.notFound(`Not products`);
        return { message: 'Products', status: 200, products };
    };

    static async getById(id) {
        let product = await Products.findById(id);
        if (product) return { status: 200, product };
        throw Boom.notFound(`Product not found`);
    };

    static async update(id, data) {
        let product = await Products.findByIdAndUpdate(id, data)
        if (product) return { status: 200, product };
        throw Boom.notFound(`Product not found`);
    };

    static async delete(id) {
        let product = await Products.findByIdAndDelete(id);
        if (product) return { status: 200, product };
        throw Boom.notFound(`Product not found`);
    };
};

module.exports = { ClassProducts };