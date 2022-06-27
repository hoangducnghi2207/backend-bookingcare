import bcrypt from "bcryptjs"
import db from "../models/index"
var salt = bcrypt.genSaltSync(10);
let createNewUser =async (data) => {
    return new Promise (async(res,rej) =>{
        try{
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
            res('Create User Success')

        }
        catch(e){
            rej(e)
        }
    })  
}
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
let getAlluser=()=>{
    return new Promise(async(res,rej)=>{
        try{
            let users=await db.User.findAll({
                raw:true
            })
            res(users)
        }
        catch(e){
            rej(e)
        }
    })
}
let getUserInfoById=(userID)=>{
    return new Promise(async(res,rej)=>{
        try{
            let user=await db.User.findOne({
                where: { id: userID },
                raw:true

            })
            if (user){
                res(user)
            }
            else
            {
                res([])
            }
        }
        catch(e){
            rej(e)
        }
        
    })

}
let updateUserData=(data)=>{
    // console.log('data from service');
    // console.log(data);
    return new Promise (async(res,rej)=>{
        try{
            let user=await db.User.findOne({
                where: { id: data.id },
            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save();
                let allUsers=await db.User.findAll()
                res(allUsers)
            }
            else{
                res();
            }
        }
        catch(e){
            rej(e);
        }
    })
}
let deleteUserByID= (userID)=>{
    return new Promise (async (res,rej)=>{
        try{
            let user=await db.User.findOne({
                where: { id: userID }
            })
            if(user){
                await user.destroy()
            }
            res();

        }
        catch(e){
            rej(e)
        }
    }
    )
}

module.exports = {
    createNewUser: createNewUser,
    getAlluser:getAlluser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserByID:deleteUserByID
}