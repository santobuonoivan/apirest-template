
const userRepository = require('../UserRepository');

exports.hasReqBuilder = async (body) => {
    let user = await userRepository.findUserByUsername(body.username);

    return {'user': user};
}