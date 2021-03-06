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
            //khi ????ng k?? thanh c??ng  th?? trong c?? s??? d??? li???u  passord sau khi ??c b??m v?? m?? h??a s??? l??u ??? d???ng kh??c trong db
            //ki ng?????i d??ng ????ng nh???p(login) th?? s??? l???y password m??nh nh???p so sanh v???i password sau khi b??m n???u gi???ng nhau m???i login ???????c
            bcryptjs.compare(password,user.password)
            //neu mat khau khop se tra ve true con khong khop se tr??? v??? false
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
        // khi user ????ng nh???p thanh c??ng v?? c?? m?? bear l?? token th??  ph???n h???i th??ng tin v??? cho user
        rs.json(rq.user)
    }
}



//router api.users.current
// tra ve user hien tai

///phan lam lai
module.exports=new UserController; 