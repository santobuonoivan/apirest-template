const Joi = require('@hapi/joi');
const { joiMsgError } = require('../../validate/errorMessages');
const { asyncDbQuery } = require('./../../../database/databaseQueries');
const AppError = require('./../../../Exceptions/AppError');

exports.hasUpdateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string()
                        .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim()
                        .allow("").allow(null).label('Nombre'),
            last_name: Joi.string()
                        .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim()
                        .allow("").allow(null).label('Apellido'),
            username: Joi.string().trim().allow("").allow(null).label('Nombre de usuario'),
            email: Joi.string()
                        .email({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'mx', 'ar', 'es']}})
                        .max(255).trim().lowercase({force: true}).allow("").allow(null).label('Email'),
            password: Joi.string().max(255).allow("").allow(null).label('Contraseña'),
            address: Joi.string().max(255).trim().allow("").allow(null).label('Dirección'),
            phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).allow('').allow(null).default(null).label('Teléfono'),
            isActive: Joi.bool().label('Estado del usuario'),
            mobile: Joi.number().integer().positive().allow('').allow(null).default(null).label('Móvil'),
            city: Joi.string().max(40).trim().allow("").allow(null).label('Ciudad'),
            state: Joi.string().max(40).trim().allow("").allow(null).label('Estado'),
            country: Joi.string().max(50).trim().allow("").allow(null).label('País'),
            profile_image: Joi.string().max(255).allow("").allow(null).label('Imagen de perfil'),
            rol: Joi.number().max(50).required().label('Rol'),
            is_sac: Joi.bool().optional().label('es usuario de SAC'),
            locations: Joi.any().when(Joi.object({ rol: Joi.valid(1,2,9) }),{
                then: Joi.object({ locations: Joi.string().allow("").allow(false).allow(null).default(null) })
            }).label('Locación')
        }).when(Joi.object({ rol: Joi.valid(11) }).unknown(), {
            then: Joi.object({ locations: Joi.array().items().min(1) }).label('Locación')
        });

        let { error, value } = schema.validate(req.body);
        if ( error )
            return res.status(400).json({error: joiMsgError(error.details[0])});

        /* SI CAMBIA EL MAIL */
        if (value.email){
            let name = (value.email.split('@'))[0].replace('.', '').replace('_', '');
            let exist = (await asyncDbQuery(`SELECT COUNT(*) AS QUANTITY FROM EE.USERS U WHERE UPPER(U.USERNAME) LIKE UPPER('%${name}%') AND U.USER_ID <> ${req.params.user_id}`))[0];
            if (exist.QUANTITY < 1) {
                value.username = name.toUpperCase();
            } else {
                let max = (await asyncDbQuery(`SELECT MAX(USER_ID) AS MAXID FROM EE.USERS`))[0].MAXID;
                value.username = `${name.toUpperCase()}_${++max}`;
            }
        }else{
            let query = (await asyncDbQuery(`SELECT U.EMAIL,U.USERNAME  FROM EE.USERS U WHERE U.USER_ID = ${req.params.user_id} ;`));
            if (query.length){
                value.email = query[0].EMAIL;
                value.username = query[0].USERNAME;
            }else{
                throw new AppError('usuario no encontrado',404);
            }
        }
        req.body = value;
        return next();
    } catch (e) {
        return res.status(e.status).json({error:e.message});
    }
};

exports.hasCreateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string().required()
                        .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim().label('Nombre'),
            last_name: Joi.string().required()
                        .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim().label('Apellido'),
            email: Joi.string()
                        .email({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'mx', 'ar','es']}})
                        .max(255).trim().lowercase({force: true}).required().label('Email'),
            username: Joi.string().trim().allow("").allow(false).allow(null).label('Nombre de usuario'),
            password: Joi.string().trim().regex(/^[\w]+(\w+)*$/).min(10).max(255).required().label('Contraseña'),
            address: Joi.string().max(255).trim().allow("").allow(false).allow(null).label('Dirección'),
            phone: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).allow('').allow(null).default(null).label('Teléfono'),
            mobile: Joi.number().integer().positive().allow('').allow(null).default(null).label('Móvil'),
            city: Joi.string().max(40).trim().allow("").allow(false).allow(null).default(null).label('Ciudad'),
            state: Joi.string().max(40).trim().allow("").allow(false).allow(null).default(null).label('Estado'),
            country: Joi.string().max(50).trim().allow("").allow(false).allow(null).default(null).label('País'),
            profile_image: Joi.string().max(255).allow(null,'').label('Imagen de perfil'),
            rol: Joi.number().valid(1,2,9,11).required().label('Rol'),
            is_sac: Joi.bool().default(false).optional().label('es usuario de SAC'),
            locations: Joi.any().when(Joi.object({ rol: Joi.valid(1,2,9) }),{
                then: Joi.object({ locations: Joi.string().allow("").allow(false).allow(null).default(null) })
            }).label('Locación')
        }).when(Joi.object({ rol: Joi.valid(11) }).unknown(), {
            then: Joi.object({ locations: Joi.array().items().min(1) })
        }).label('Locación');

        let { error, value } = schema.validate(req.body);
        if ( error )
            return res.status(400).json({error: joiMsgError(error.details[0])});

        let name = (value.email.split('@'))[0].replace('.', '').replace('_', '');
        const query = `SELECT COUNT(*) AS QUANTITY FROM EE.USERS U WHERE UPPER(U.USERNAME) LIKE UPPER('%${name}%')`;
        let exist = (await asyncDbQuery(query))[0];
        if (exist.QUANTITY < 1) {
            value.username = name.toUpperCase();
        } else {
            let max = (await asyncDbQuery(`SELECT MAX(USER_ID) AS MAXID FROM EE.USERS`))[0].MAXID;
            value.username = `${name.toUpperCase()}_${++max}`;
        }

        req.body = value;
        return next();
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
};

exports.hasDeleteUser = async (req, res, next) => {
    try {
        const schema = Joi.object({ 
            user_id: Joi.number().integer().min(0).positive().required().label('Id de usuario') 
        });

        let { error, value } = schema.validate(req.params);
        if ( error ) return res.status(400).json({error: joiMsgError(error.details[0])});

        if( req.user.USER_ID == value.user_id)
            return res.status(400).json({error: 'No se puede eliminar el usuario con el que inició sesión', status: 400});

        return next();
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
};