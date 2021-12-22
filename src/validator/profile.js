const Validator=require('validator');
const isEmpy=require('./is_empty');
module.exports=function validatorProfile(data){
    const errors={}
     data.handle=!isEmpy(data.handle)?data.handle:"";
     data.skills=!isEmpy(data.skills)?data.skills:"";
     data.status=!isEmpy(data.status)?data.status:"";

    if(!Validator.isLength(data.handle,{min:2,max:40})){
        errors.handle="handls needs to between 2 and 4 characters"
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle="handle is required"
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills="Skills is required"
    }

    if(Validator.isEmpty(data.status)){
        errors.status="status is required"
    }

    return {
        errors,
        isValid:isEmpy(errors)
    }


    //phần check rông khoi cần vì có if kiểm tra rồi chỉ cần fix mấy chỗ độ dai..
    // const location=!isEmpy(data.location)?data.location:"";
    // const status=!isEmpy(data.status)?data.status:"";
    // const skills=!isEmpy(data.skills)?data.skills:"";
    // const bio=!isEmpy(data.bio)?data.bio:"";
    // const githubSername=!isEmpy(data.githubSername)?data.githubSername:"";
  
    
   
}
