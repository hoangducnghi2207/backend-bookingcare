import { json } from 'body-parser';
import db from '../models/index'
import CRUDService from '../services/CRUDservice'
let getHomePage =async (req, res) => {
    try{
        let data= await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        });
    }catch (e){
        console.log(e);
    }
   
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD= (req,res) =>{
    return res.render ('crud.ejs')
}
let postCRUD=async(req,res) =>{
    let message= await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}
let displaygetCRUD=async(req,res)=>{
    let data=await CRUDService.getAlluser();
    console.log(31,data);
    return res.render('displayCRUD.ejs',{
        dataTable:data
    })
}
let getEditCRUD=async (req,res)=>{
    let userID=req.query.id;
    console.log(userID);
    if(userID){
        let userData=await CRUDService.getUserInfoById(userID)
        console.log(41,userData);
        return res.render('editCRUD.ejs',{
            user:userData
        })
    }
    else{
        res.send('User not found')

    }
}
let putCRUD =async (req,res)=>{
    let data=req.body;
    let allUsers=await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs',{
        dataTable:allUsers
    })}
let deleteCRUD =async (req,res)=>{
    let id=req.query.id
    if (id){
    await CRUDService.deleteUserByID(id)
    return res.send('delete succes')
    }
    else{
        return res.send('user not found')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displaygetCRUD:displaygetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD    
}
