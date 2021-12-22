const express=require("express");
const Route=express.Router();
const passport=require('passport');
const UserControllers=require("../../app/Controllers/UserControllers");
Route.get('/current', passport.authenticate('jwt',{session:false}),UserControllers.userCurrent)
Route.post('/register',UserControllers.userRegister);
Route.post('/login',UserControllers.userLogin);
module.exports=Route;

