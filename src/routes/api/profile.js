const express=require("express");
const Router=express.Router();
const passport=require('passport')
const Profile=require('../../app/Controllers/ProfileControlers');

//passpost tahng kiem tra co token hay chua
Router.get('/',passport.authenticate('jwt',{session:false}),Profile.profiles);
Router.post('/',passport.authenticate('jwt',{session:false}),Profile.ProfilePost);
Router.delete('/',passport.authenticate('jwt',{session:false}),Profile.deleteProfileuser);
Router.get('/all',passport.authenticate('jwt',{session:false}),Profile.ProfileAll);
Router.post('/experience',passport.authenticate('jwt',{session:false}),Profile.profileExperience);
Router.delete('/experience/:id',passport.authenticate('jwt',{session:false}),Profile.deleteExperience);
Router.post('/education',passport.authenticate('jwt',{session:false}),Profile.profileeducation);
Router.delete('/education/:id',passport.authenticate('jwt',{session:false}),Profile.deleteducation);
Router.get('/user/:userid',passport.authenticate('jwt',{session:false}),Profile.ProfileDetailUser);
Router.get('/handle/:handle',passport.authenticate('jwt',{session:false}),Profile.MoreProfile);
module.exports=Router;