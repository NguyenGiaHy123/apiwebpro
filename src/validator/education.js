const Validator=require('validator');
const isEmpty=require('./is_empty');
module.exports=function validtatorExperience(data){
    const errors={}
    data.school=!isEmpty(data.school)?data.school:'';
    data.degree=!isEmpty(data.degree)?data.degree:''
    data.fielofStudy=!isEmpty(data.fielofStudy)?data.fielofStudy:'';
    data.from=!isEmpty(data.from)?data.from:'';
    if(Validator.isEmpty( data.school)){
        errors.school="title is require"
    }

    if(Validator.isEmpty( data.degree)){
        errors.degree="company is require"
    }


    if(Validator.isEmpty( data.from)){
        errors.from="from is require"
    }
    if(Validator.isEmpty( data.fielofStudy)){
        errors.fielofStudy="from is require"
    }
 

    return{
      
    errors,
    isValid:isEmpty(errors)
    }
    

}