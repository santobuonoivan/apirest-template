const env = require('dotenv').config();
const {username,password,database,host,dialect, pool} = require('./config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password,{
    host:host,
    dialect:dialect,
    pool:pool

});
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const userServices = require('../components/users/services/UserService');


const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../components/users/models/users')(sequelize,Sequelize);

/*
db.users.belongsToMany(db.roles, {through:'user_roles', foreignKey:'user_id'});
db.roles.belongsToMany(db.users, {through: 'user_roles', foreignKey: 'role_id'});
db.users.belongsToMany(db.permissions, {through: 'permission_user', foreignKey:'user_id'});
db.permissions.belongsToMany(db.users, {through:'permission_user', foreignKey:'permission_id'});
db.roles.belongsTo(db.roles, {foreignKey:'parent'});
db.permissions.belongsToMany(db.roles, {through: 'permission_role', foreignKey:'permission_id'});
*/
db.sequelize.sync({force:false}).then(() =>  {
});

module.exports =  db;
