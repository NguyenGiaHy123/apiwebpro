const Validator=require('validator');
const isEmpty=require('./is_empty');
module.exports=function validtatorExperience(data){
    const errors={}
    data.title=!isEmpty(data.title)?data.title:'';
    data.company=!isEmpty(data.company)?data.company:''
    data.from=!isEmpty(data.from)?data.from:'';
    if(Validator.isEmpty( data.title)){
        errors.title="title is require"
    }

    if(Validator.isEmpty( data.company)){
        errors.company="company is require"
    }


    if(Validator.isEmpty( data.from)){
        errors.from="from is require"
    }
 

    return{
      
    errors,
    isValid:isEmpty(errors)
    }
    

}