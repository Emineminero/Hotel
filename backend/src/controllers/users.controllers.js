const pool = require('../database');
const userObj = require( '../models/User');
const usersCtrl = {};


usersCtrl.getUsers = async (req,res) => {
    const users = await pool.query("SELECT * FROM user_account");
    res.json({users});
};
usersCtrl.createUser = async (req,res) => {
    try{
        await this.saveUserToDB(req.body,res);
    }catch(e){
        console.log("Fallo al crear usuario",e);
        res.json(e.detail);
    }
}

usersCtrl.getUser = async (req,res) => {
    try{
        const user = await pool.query("SELECT * FROM user_account where user_id = $1", [req.params.id]);
        res.json(user.rows)
    }catch(e){
        console.log("PUM");
    }
}
usersCtrl.deleteUser = async (req,res) => {

    res.json('User Deleted :(')
}

usersCtrl.saveUserToDB = async (reqBody,res)=>{
    const {first_name,last_name,username,password,email,user_role_id} = reqBody;
    const created_on = Date.now()/1000;
    userObj.setFields(
        {first_name,
        last_name,
        username,
        password,
        email,
        user_role_id,
        created_on}
    );
    if(!userObj.validFields()){
        throw {detail:"Complete todos los campos"};
    }
    const userToInsert = await pool.query("INSERT INTO user_account (" +
        "first_name," +
        "last_name," +
        "username," +
        "password," +
        "email," +
        "user_role_id," +
        "created_on)" +
        "VALUES($1,$2,$3,$4,$5,$6,to_timestamp("+created_on+")) RETURNING *",[userObj.first_name,
        userObj.last_name,userObj.username,await userObj.encryptPassword(password),userObj.email,userObj.user_role_id]);
    res.json({user:userToInsert.user.rows});
}

usersCtrl.updateUser = async (fields,userId) =>{
    const fieldsKeys = Object.keys(fields);
    const fieldsWParams = fieldsKeys.map((k, index) => `${k} = $${index + 1}`).join(", ");
    const len = Object.keys(fields).length + 1;
    const values = [];
    Object.keys(fields).forEach(key => {
        values.push(fields[key]);
    });
    values.push(userId);
    console.log("UPDATE user_account SET " +
        fieldsWParams+" WHERE user_id = $"+len);
    console.log(values);
    pool.query("UPDATE user_account SET " +
        fieldsWParams+" WHERE user_id = $"+len,
        values);
}



module.exports = usersCtrl;