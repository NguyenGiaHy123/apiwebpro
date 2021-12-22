const users=require('./users');
const profile=require('./profile');
const posts=require('./posts');
function Router(app){
    app.use("/api/users",users);
    app.use("/api/profile",profile);
    app.use("/api/posts",posts);
}
module.exports=Router;
