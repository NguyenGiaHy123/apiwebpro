const JwtStrategy=require('passport-jwt').Strategy;//chien luoc
const ExactJWT=require('passport-jwt').ExtractJwt;//trich xuat
const mongoose=require('mongoose');
const User=mongoose.model('Users');
const keys="secret";
const opts={}
//fromAuthHeaderAsBearerToken ham nay se lay token neu mình không gửi token lên làm 
// sao nó biết được nên nó sẽ phản hồi về Unthorzition
opts.jwtFromRequest=ExactJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys
// no se kiem tra token do server gui ve cho client co dung
// nhu token ma phia client gui len cho server khong
// no se gia ma token

module.exports=passport=>{
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // jwt payload sẽ chứ thông tin của user tokem id thời gian hết hạn của user đó
            // nếu thành công payload sẽ chứa dữ liệu của user đó 
            // sau khi có dữ liệu đó mình sẽ tìm trong db user dữ là thằng user nào theo id
            User.findById(jwt_payload.id).then(user=>{
                //nếu tìm thấy user
                if(user){
                    return done(null,user);
                }
                // không tìm thấy user
                return done(null,false);
            })
            .catch(err=>console.log(err))
        })
      );
}

//JwtStrategy
//ExacJwt
//mongoose
//user
//opts
