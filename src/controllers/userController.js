import userservice from "../services/userservice"
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter'
        })
    }
    let userData = await userservice.handleUserLogin(email, password)
    console.log(13,userData);
    return res.status(200).json({
       
        userData

    }) //trạng thái 200- hoat đông bình thường, lỗi-500
}
let handleGetAllUser =async (req,res)=>{
    let id=req.query.id //ALl,id
    let users=await userservice.getAllUser(id);
    console.log(23,users);
    return res.status(200).json({
        errCode:0,
        errMessage:'OK',
        users
    })
}
let handleCreateNewUser=async(req,res)=>{
    let message=await userservice.createNewUser(req.body)
    console.log(32,message);
    return res.status(200).json(message)

}
let handleDeleteUser=async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:'Missing parameter'
        })
    }
    let message= await userservice.deleteUser(req.body.id)
    return res.status(200).json(message)
}
let handleEditUser=async(req,res)=>{
    let data=req.body
    let message= await userservice.editUser(data)
    return res.status(200).json(message)
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser:handleGetAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleDeleteUser:handleDeleteUser,
    handleEditUser:handleEditUser
}