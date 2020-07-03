const userObj = require('../models/User');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const usersController = require('./users.controllers');

const USER_NOT_FOUND = "Usuario no encontrado";
const WRONG_PASSWORD = "Contraseña incorrecta";
const SUCCESSFUL_LOGIN = "Login exitoso";

module.exports = class AuthController{
    async findUserAndLogin(req){
        const {username,password} = req.body;
        if(username && password) {
            const user = await pool.query("SELECT * FROM user_account WHERE username = $1 LIMIT 1", [username]);
            if (!user) {
                return {status:403,message:USER_NOT_FOUND};
            }
            return await this.validateCredentials(user, username, password);
        } else {
            return {status:403,message:USER_NOT_FOUND}
        }
    }

    async validateCredentials(user,username,password){

        userObj.setFields({
            username:user.rows[0].username,
            password:user.rows[0].password
        });
        const isPasswordValid = await userObj.verifyPassword(password);
        if(!isPasswordValid){
            return {status:403,message:WRONG_PASSWORD,auth:false,token:null}
        }
        const token = jwt.sign({id:user.rows[0].user_id},process.env.SECRET_TOKEN,{
            expiresIn: 60*60*24
        });
        delete user.rows[0]["password"];
        //update last login date
        const last_login = new Date();
        usersController.updateUser({last_login:last_login},user.rows[0].user_id);
        return {user:user.rows[0],auth:isPasswordValid,token:token,message:SUCCESSFUL_LOGIN};
    }

    async verifyToken(token) {
        //this.ensureToken(req);
        await jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
            if (err) {
                return {status:403,tokenVerified: false};
            } else {
                return {tokenVerified: true};
            }
        });
    }

    // ensureToken(req){
    //     const bearerHeader = req.headers['authorization'];
    //     if(typeof bearerHeader !== 'undefined'){
    //         const bearer = bearerHeader.split(" ");
    //         req.token = bearer[1];
    //     }else{
    //         return {status:403};
    //     }
    // }
};


