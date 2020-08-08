'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('./../../middleware/Authentication');
//const authorization = require('./../../middleware/Authorization');
//const {hasCreateUser, hasUpdateUser, hasDeleteUser } = require('./validator/UserValidator');

const userController = require('./UserController');

router.post('/',[cors(), authentication,/* hasCreateUser*/ ], userController.createUser);
router.put('/:user_id',[cors(), authentication,/* hasUpdateUser*/ ], userController.updateUser);
router.delete('/:user_id',[cors(), authentication,/* hasDeleteUser*/], userController.deleteUser);
router.get('/',[cors(), authentication], userController.getAllUser);
router.get('/:user_id',[cors(),authentication], userController.getOneUser);
router.get('/formData',[cors(),authentication],userController.getAddForm);
/*
router.post('/passwordRecovery/',[cors(), authentication], userController.passwordRecovery);
router.post('/resetPassword/',[cors(), authentication],userController.resetPassword);
router.get('/validateuseraccount/:emailtoken',[cors(), authentication], userController.validateUserAccount);
router.get('/testtoken',[cors(),authentication,authorization('TOKEN','TEST_TOKEN')],userController.testToken);
router.get('/refreshToken',[cors(),authentication,authorization('TOKEN','TEST_TOKEN')],userController.refreshToken);
*/
module.exports = router;
