const Validator=require('validator');
const isEmpty=require('./is_empty')
module.exports=function validateRegisterInput(data){
    let errors={};
   //1isEmpty tuc la chuoi do tra ve false la khong rong
   
    data.name=!isEmpty(data.name)?data.name:'';
    data.email=!isEmpty(data.email)?data.email:''
    data.password=!isEmpty(data.password)?data.password:''
    data.passwordComfirm=!isEmpty(data.password)?data.passwordComfirm:''
   
  

   
    if(!Validator.isEmail((data.email))){
        errors.email="email is invalid"
    }

    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name="ten phai giu 2 va 30 ky tu"
    }
    
    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password="password must be at least 6 characters"
    }

    if(Validator.isEmpty((data.password))){
        errors.password="password field is required"
    }

    if(Validator.isEmpty((data.passwordComfirm))){
        errors.passwordComfirm="passwordComfirm  field is required"
    }
     
    if(Validator.equals(data.password,data.passwordComfirm)){
        errors.passwordComfirm="password much match"
    }

    
    
    return{
        errors,
        //neu bien object errors khong cos loi nao thi no se trong va tra ve  truw
        //con neu bien error co them mot loi nao nua thi object do cp con loi nua 
        //thi no se khac voi nul unnderfin la k co loi gi
         isValid : isEmpty(errors)
    }
}