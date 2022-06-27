import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    //Giao diện đăng ký ng dùng
    router.get('/crud', homeController.getCRUD);
    //Them user
    router.post('/post-crud', homeController.postCRUD)
    //Hien thi user để sửa xoá
    router.get('/get-CRUD', homeController.displaygetCRUD)
    //Sua User
    router.get('/edit-CRUD', homeController.getEditCRUD)
    router.post('/put-CRUD',homeController.putCRUD)
    //Xoa user
    router.get('/delete-CRUD', homeController.deleteCRUD)
   
    //API REACT
    //API xu ly dang nhap
    router.post('/api/login', userController.handleLogin)
    //API Lay thong tin ng dung
    router.get('/api/get-all-user',userController.handleGetAllUser)
    //API tao nguoi dung
    router.post('/api/create-new-user',userController.handleCreateNewUser)
    //xoa User
    router.delete('/api/delete-user',userController.handleDeleteUser)
    //sua user
    router.put('/api/edit-user',userController.handleEditUser)
    return app.use("/", router);

}


module.exports = initWebRoutes;