const Validator=require('validator');
const isEmpty=require('./is_empty');
module.exports=function validtatorPost(data){
    const errors={}
    data.text=!isEmpty(data.text)?data.text:'';
  
    if(Validator.isEmpty( data.text)){
        errors.text="text is require"
    }

    if(!Validator.isLength( data.text,{min:10,max:300})){
        errors.text="text must be between 10 and 300"
    }


    return{
      
    errors,
    isValid:isEmpty(errors)
    }
    

}