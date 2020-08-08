const User = require('./../models/users');
const userService = require('./UserServices');
const userRepository = require('./UserRepository');
const sendValidateUserMail = require('./user_validate/EmailRepository');

exports.createUser = async function(req,res,next){
    const {username, email} = req.body;
    try {
        let availability = await userService.usernameEmailExists(username,email);
        if(availability){
            let uss = await userRepository.createUser(req.body);
            delete uss.password;
            return res.status(201).send({user: uss, status:201});
        }
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.updateUser = async function(req,res,next){
    try {
            let userEmailExist = await userService.usernameEmailExists(req.body.username,req.body.email,req.params.user_id);
            let write = await userRepository.updateUser(req.params.user_id, req.body);
            return res.status(201).json(write);
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.deleteUser = async function(req,res,next){
    try {
            let write = await userRepository.deleteUser(req.params.user_id);
            return res.status(200).json(write);
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.getAllUser = async function(req,res,next){
    try {
        let users = await userRepository.getAllUser();
        return res.status(200).json(users);
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.getOneUser = async function(req,res,next){
    try {
        const { user_id } = req.params;
        let users = await userRepository.getOneUser(user_id);
        return res.status(201).json(users);
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.getAddForm = async function(req,res,next){
    try {
        let formData = await userRepository.getAddForm();
        return res.status(201).json(formData);
    }catch (e) {
        if(e instanceof require('./../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.testToken = async function (req,res,next) {
    return res.send({user:req.user, ur:req.user_roles,ul:req.user_locations});
};

exports.refreshToken = async function (req,res,next) {
    const refresh_token =  await userService.generateToken(req.user);
    return res.send({ token: refresh_token});
};


