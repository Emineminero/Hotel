const bcrypt = require('bcryptjs');

const userObj = {};
    userObj.setFields = (details) =>{
        userObj.first_name = details.first_name;
        userObj.last_name = details.last_name;
        userObj.username = details.username;
        userObj.password = details.password;
        userObj.email = details.email;
        userObj.user_role_id = details.user_role_id;
        userObj.created_on = details.created_on;
    }

    userObj.validFields = ()=> {
        return userObj.first_name.length !== 0 &&
            userObj.last_name.length !== 0 &&
            userObj.username.length !== 0 &&
            userObj.password.length !== 0 &&
            userObj.email.length !== 0 &&
            userObj.user_role_id.length !== 0;
    }

    userObj.encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    userObj.verifyPassword = async function (password){
        return await bcrypt.compare(password,userObj.password);
    }


module.exports = userObj;