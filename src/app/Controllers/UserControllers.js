const User=require('../../app/Models/User');
const gravatar =require('gravatar');
// bam mat khau
const bcryptjs=require('bcryptjs');
const acesskeys='Acesssecret';
const refetokenkeys='refetsecret';
const jwt=require('jsonwebtoken');
const passport=require('passport');
const validateRegisterInput=require("../../validator/register");
const validateLoginInput=require("../../validator/login");
class UserController{
   
    ///api/users//register
    userRegister(rq,rs){
        //phan kiem tra chuoi ma o server post len
        const {errors,isValid}=validateRegisterInput(rq.body);
        //isValid nay se tra ve true hoac false
        if(!isValid){
            rs.status(400).json(errors)
        }
        //isvalid ==true tuc la khong co loi
        else{
           User.findOne({email:rq.body.email}) 
        .then((user)=>{
            if(user){
                return rs.status(400).json({email:'Email already exists'});
            }
            else{
                const avatar=gravatar.url(rq.body.email,{
                    s:'200',//kich co
                    r:'pg',//
                    d:'mm'//mat dinh

                })
                const newUser=new User({
                    name:rq.body.name,
                    email:rq.body.email,
                    avatar,
                    password:rq.body.password
                })
                //ma hoa mat
                //setRound la so 10 set round cang cao thi tuhuat toan bam cang nhieu cang mat tg ne mac dinh la 10
               //tao muoi va bam mat khau
                bcryptjs.genSalt(10,(err,salt)=>{
                    //them ham bam ben trong ham gensalt 
                    //1.passwoss
                    //2.muoi 
                    //goi lai loi va bam tra ve
                    bcryptjs.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                         // Store hash in database here
                        newUser.password=hash; 
                        newUser.save()
                        .then(user=>{rs.json(user)})
                        .catch(err=>console.log(err)) }) }) }}) 
        }
    }
    //khi dang nhap dung email voi password thi se tra ve token cho nguoi dung
   ///api/users/login
    userLogin(rq,rs){
        //tim email
        const {errors,isValid}=validateLoginInput(rq.body);
        if(!isValid){
            return rs.status(400).json(errors)
        }
        const email=rq.body.email;
        const password=rq.body.password;
        User.findOne({email})
        .then(user=>{
            if(!user){
                errors.email="user email not fount";
                return rs.status(404).json({errors});
            }
            //khi đăng ký thanh công  thì trong cơ sở dữ liệu  passord sau khi đc băm và mã hóa sẽ lưu ở dạng khác trong db
            //ki người dùng đăng nhập(login) thì sẽ lấy password mình nhập so sanh với password sau khi băm nếu giống nhau mới login được
            bcryptjs.compare(password,user.password)
            //neu mat khau khop se tra ve true con khong khop se trả về false
            .then(isMatch=>{
                if(isMatch){
                    //khi dang nhap dung
                    //tra ve token
                    const payLoad={id:user.id,name:user.name,avatar:user.avatar}
                    //tao ra chuoi token tu nhung dl tren
              const acessToken= jwt.sign(
                    payLoad,
                    acesskeys,
                    //expiresIn thoi gian het han su dung cua token khi 
                    //het han can dang nhap lai va nhan token moi
                    {expiresIn:9000}
                 )


                 rs.json({
                     succes:true,
                     acessToken:"Bearer " +acessToken ,
                   
                 })
                }
                else{
                    errors.passsword="Password incorrect";
                    return rs.status(400).json({errors});
                }
            })
        })
    }


   

    ///api/users/current
    userCurrent(rq,rs){
        // khi user đăng nhập thanh công và có mã bear là token thì  phản hồi thông tin về cho user
        rs.json(rq.user)
    }
}



//router api.users.current
// tra ve user hien tai

///phan lam lai
module.exports=new UserController; 