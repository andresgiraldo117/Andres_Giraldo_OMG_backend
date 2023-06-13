const Users = require('../models/User');
const Boom = require('@hapi/boom');

class ClassUsers {

    static async register (data) {
        let newObjUser = new Users({ 
            ...data,
            password : await Users.encryptPassword(data.password),
        });  
        await newObjUser.save();

        return { status: 200, message: "Creado con exito", newObjUser };
    };

    static async getAll (user) {
        const users = await Users.find();
        return users;    
    }

    static async getById (id) {
        const userId = await Users.findById(id);
        userId.password = undefined
        return userId
    };
    
    static async getByToken(token){
        let user = await Users.findOne({ token: token });
        if(!user) {
            throw Boom.notFound('Error');
        }else{
            return user;
        }
    };
    
    static async update( id, data ){
        const user = await Users.findByIdAndUpdate(id, data)
        const userId = await Users.findById(id);
        if(user) return { status: 200, userId };
        throw Boom.notFound(`User not found`);
    };

    static async remove( id ){
        let user = await Users.findByIdAndDelete(id);
        if(user) return { status: 200, user, message: 'Eliminado con exito' };
        throw Boom.notFound(`User not found`);
    };
}

module.exports = { ClassUsers };
