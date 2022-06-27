const db = require("../models")
import bcrypt from "bcryptjs"
var salt = bcrypt.genSaltSync(10);
let hashPassWord = (password) => {
    return new Promise(async(res, rej) => {
        try{
            var hashPassWord = await bcrypt.hashSync(password, salt);
            res(hashPassWord)
        }catch(e){
            rej(e)
        }
    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (res, rej) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //User da ton tai
                //so sanh password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    //compare password
                    console.log(password);
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK'
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }

                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found'
                }
                res(userData)
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = 'Your email is not exsit. PLS Try Agian';
                res(userData)
            }
        }
        catch (e) {
            rej(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },

            })
            if (user) {
                res(true)
            }
            else {
                res(false)
            }
        }
        catch (e) {
            rej(e)
        }
    }
    )
}
let getAllUser = (userID) => {
    return new Promise(async (res, rej) => {
        try {
            let users = ''
            if (userID == 'ALL') {
                users = await db.User.findAll({

                })
            }
            if(userID && userID!=='ALL') {
                users = await db.User.findOne({
                    where: { id:userID },
    
                })
            }
            
            res(users)
        }
        catch (e) {
            rej(e)
        }
    })
}
let createNewUser=(data)=>{
    return new Promise(async(res,rej)=>{
        try{
            let check =await checkUserEmail(data.email)
            if(check==true){
                res({
                    errCode:1,
                    message:'email already used'
                })
            }
            
            let hashPassWordfromBcrypt= await hashPassWord(data.password)
            await db.User.create({
                email: data.email,
                password:hashPassWordfromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber:data.phonenumber,
                gender: data.gender ==="1"? true: false,
                roleId:data.roleId,
            })
            res({errCode:0,errMessage:'OK'})
        }
        catch(e){
            rej(e)
        }
    })
}
let deleteUser=(userID)=>{
    return new Promise (async(res,rej)=>{
        try{
            let founduser=await db.User.findOne({
                where: { id:userID },

            })
            console.log(139,founduser);
            if(!founduser){
                res({
                    errCode:2, errMessage:'user is not exist'
                })
            }
            if(founduser){
            await founduser.destroy();}
            res({
                errCode:0, message:'delete success'
            })
        }
        catch(e){
            rej(e)
        }
    })
}
let editUser=(data)=>{
    return new Promise (async(res,rej)=>{
        try{
            let user=await db.User.findOne({
                where: { id: data.id },
            })
            if(user){

                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save()
                res({
                    errCode:0, errMessage:'update success'
                })
            }
            else{
                res({errCode:1,errMessage:'update fail'});
            }
        }
        catch(e){
            rej(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUser: getAllUser,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    editUser:editUser  

}