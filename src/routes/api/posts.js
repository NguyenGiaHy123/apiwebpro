const express=require("express");
const Route=express.Router();
const passport=require('passport');
const PostControllers=require("../../app/Controllers/PostsControllers");
Route.post('/',passport.authenticate('jwt',{session:false}),PostControllers.postControllers);
Route.get('/',passport.authenticate('jwt',{session:false}),PostControllers.GETPosts);
Route.post('/like/:id',passport.authenticate('jwt',{session:false}),PostControllers.likePost);
Route.post('/unlike/:id',passport.authenticate('jwt',{session:false}),PostControllers.unlikePost);
Route.post('/comment/:id',passport.authenticate('jwt',{session:false}),PostControllers.commentId);
Route.post('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),PostControllers.deletecommentId);

Route.get('/:id',passport.authenticate('jwt',{session:false}),PostControllers.GETPostsId);
Route.delete('/:id',passport.authenticate('jwt',{session:false}),PostControllers.DeletePostsId);
module.exports=Route;

