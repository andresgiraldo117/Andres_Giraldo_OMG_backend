const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Boom = require('@hapi/boom');
    
class ClassAuth {

    static async login(email, password) {
        let account = await User.findOne({ email });
        if(!account) throw Boom.notFound(`Contraseña o correo invalido`);
        
        const matchPassword = await User.comparePassword(password, account.password);
        if(!matchPassword) throw Boom.badData(`Contraseña o correo invalido`);

        const token = jwt.sign({id: account._id}, config.SECRET, { 
            expiresIn: 90000 
        })  
        
        account.password = undefined;
        let response = account;
        response.token = token
        await User.findOneAndUpdate({email:response.email}, {token: token});

        return { status: 200, message: "Success", response};
    }

    static async registerUser(data) {
        let usercurrent = await User.findOne({ email: data.email });
        if(usercurrent) throw Boom.notFound(`Ya existe un usuario con este correo`);
            
        let newUser = new User({ 
            ...data,
            password : await User.encryptPassword(data.password),
        });  
        await newUser.save();
        newUser.password = undefined;
        return { status: 200, message: "Creado con exito", newUser };
    }
}
module.exports = { ClassAuth }
