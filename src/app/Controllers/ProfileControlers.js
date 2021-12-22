const { raw } = require('body-parser');
const mongoose=require('mongoose');
const passport=require('passport');
const Profie=require('../../app/Models/Profile');
const validatatorProfile=require('../../validator/profile');
const validatatorExperience=require('../../validator/experience');
const validationEducation=require('../../validator/education');
const Profile = require('../../app/Models/Profile');
class ProfileControllers{
   
    //neu minh ma truy cap vao duong dan /api/user 
    //thi no se gui ve chu Unthozition tai vi minh co de passport dang truoc collert
    //no xac thuc phai co token gui dinh kem thi moi cho truy cap vao trang web  
     //@GetProfile
      //  /api/profile
    profiles(rq,rs){
        const errors={}
        Profie.findOne({user:rq.user.id})

        //cai rs chi co thong tin cua profile thoi de lay them thong tin cua user phan hoi ve 
        //dung populate cho phep lay them thong tin cua db user
        .populate('user',['name','avatar','email','id'])

        .then((profile)=>{

            if(!profile){

                errors.noProfile="there is no profile for this user"

              return  rs.status(404).json(errors)
            }

            else{

                rs.json(profile)
            }

        })
        .catch(err=>rs.status(404).json(err))
    }


    
    //tao mot va update profile

    //@post

   // /api/profile/
   //post se tao hoac update profile
   //neu co id roi thi update profile


    ProfilePost(rq,rs){

        const profields={};

        const {errors,isValid}=validatatorProfile(rq.body);
        if(!isValid){

            return rs.status(400).json(errors)
        }

        else{

            //lay id ma thang thuc hien chuc nang

            profields.user=rq.user.id;
        //kiem tra tren hadle co rong khong  cach khac dung validator de kiem tra
        if(rq.body.handle){ profields.handle=rq.body.handle;}

        if(rq.body.company){ profields.company=rq.body.company;}
        
        if(rq.body.website){ profields.website=rq.body.website;}

        if(rq.body.location){ profields.location=rq.body.location;}

        if(rq.body.bio){ profields.bio=rq.body.bio;}

        if(rq.body.githubSername){ profields.githubSername=rq.body.githubSername;}

        if(rq.body.status){ profields.handle=rq.body.handle;}

        //skills-split into ARRAY
        if(rq.body.skills !=='undefined'){ 
            //se thanh mot cai mang moi phan tu cach nhau boi dau,
              // "skills": [
             //"aaaaaaa",tttt,jjj
             // ]
            profields.skills=rq.body.skills;
        }
        // //social
        profields.social={}
        if(rq.body.youtube){ profields.social.youtube=rq.body.youtube;}

        if(rq.body.twittwer){ profields.social.twittwer=rq.body.twittwer;}

        if(rq.body.facebook){ profields.social.facebook=rq.body.facebook;}

        if(rq.body.linkedin){ profields.social.linkedin=rq.body.linkedin;}

        if(rq.body.intergram){ profields.social.intergram=rq.body.intergram;}
        
        // Profie.findOne({user:rq.user.id})
        // .then((profile)=>{ rs.json(profile)})
       
        Profie.findOne({user:rq.user.id}).then(profile=>{
            if(profile){
            //    upadate neu ma profile co trong db roi thi update con khong co thi them
               Profie.findOneAndUpdate(
                    {user:rq.user.id},// update theo id

                    {$set:rq.body},// tai id do se thay doi thanh rq.body nay

                    {new:true}
                     
                    ).then(profile=>rs.json(profile))

                    .catch(err=>rs.json(err))
            }
            else{
              
                new Profie(profields).save()
                         .then(profile=>{rs.json(profile)})

                         .catch(err=>{

                             rs.json(err)
                         });
                // Profie.findOne({handle:profields.handle}).then((profile)=>{
                //        if(profile){

                //           errors.handle="that handle already exists" ;

                //           rs.status(400).json(errors)
                //        }
                //        else{
                //             //save profile
                //         //    rs.json(profields)
                //          new Profie(profields).save()
                //          .then(profile=>{rs.json(profile)})

                //          .catch(err=>{

                //              rs.json(err)
                //          });

                //        }  
                //    }
                // )
            }
            
        })
      }
  
    }


    //lay tham so tren url la handle
    //get
    ///api/profile/handle/:handle

   

    MoreProfile(rq,rs){
        const errors={}
        Profie.findOne({handle:rq.params.handle})  

        .populate('user',['name','avatar'])

        .then(profile=>{

            if(!profile){

                errors.noProfile="there is no profile for this user"
            }
            else{
                rs.json(profile)
            }
           
        })
        .catch(err=>rs.status(404).json(err))

    }


     
    //lay tham so tren url la id cuar user
    ///api/profile/user/:userid

    ProfileDetailUser(rq,rs){
        
        const errors={}
        //ten tham so muon lay phai trung voi ten quy dinh url
     
        Profie.findOne({user:rq.params.userid})
        .populate('user',['name','avatar'])
        .then(userProfile=>{
            if(!userProfile){
                errors.userProfile="there is no userProfile for this user"
            }
            else{
                rs.json(userProfile)
            }
           
        })
        .catch(err=>rs.status(404).json(err))

    }

 // @router Post  /api/profile/all
 //lay tat ca profile

    ProfileAll(rq,rs){
        
        const errors={}
        //ten tham so muon lay phai trung voi ten quy dinh url
     
        Profie.find({})

        .populate('user',['name','avatar'])

        .then(userProfile=>{

            if(!userProfile){

                errors.userProfile="there is no userProfile for this user"
            }
            else{
                rs.json(userProfile)
            }
           
        })

        .catch(err=>rs.status(404).json(err))

    }

     // @router Post  /api/profile/experience

     profileExperience(rq,rs){
       
        const {errors,isValid}=validatatorExperience(rq.body);
       
        if(!isValid){

            return rs.status(400).json(errors)
           
        }

        Profie.findOne({user:rq.user.id})

        .then(profile=>{
           
            const newExp={
                title:rq.body.title,

                company:rq.body.company,

                location:rq.body.location,

                from:rq.body.from,

                to:rq.body.to,

                current:rq.body.current,

                description:rq.body.description
            }
            profile.experience.unshift(newExp);

            profile.save().then(profile=>rs.json(profile)).
            catch(err=>rs.json(err))
        })
     }




     // @router Post  /api/profile/education

     profileeducation(rq,rs){
        
        const {errors,isValid}=validationEducation(rq.body);
       
        if(!isValid){

            return rs.status(400).json(errors)
           
        }

        Profie.findOne({user:rq.user.id})

        .then(profile=>{
           
            const newEducation={
                school:rq.body.school,

                degree:rq.body.degree,

                fielofStudy:rq.body.fielofStudy,

                from:rq.body.from,

                to:rq.body.to,

                current:rq.body.current,

                description:rq.body.description
            }
            profile.education.unshift(newEducation);

            profile.save().then(profile=>rs.json(profile)).
            catch(err=>rs.json(err))
        })
     }

      // @router delete  /api/profile/experience/:id

      deleteExperience(rq,rs){
        Profie.findOne({user:rq.user.id})
        .then(profile=>{
           const newIndexRemove=profile.experience.findIndex(x=>x.id===rq.params.id)
        
           profile.experience.splice(newIndexRemove,1);
           profile.save().then(profile=>rs.json(profile))
        })
        .catch(err=>rs.json(err))
     }

     // @router delete  /api/profile/education/:id

     deleteducation(rq,rs){
        Profie.findOne({user:rq.user.id})
        .then(profile=>{
           const newIndexRemove=profile.education.findIndex(x=>x.id===rq.params.id)
           profile.education.splice(newIndexRemove,1);
           profile.save().then(profile=>rs.json(profile))
        })
        .catch(err=>rs.status(404).json(err))
     }
     //delete user and profile
     // @router delete  /api/profile xóa toàn bộ profile theo user id 

     deleteProfileuser(rq,rs){
        Profie.findOneAndRemove({user:rq.user.id})
        .then(()=>{
            user.findOneAndRemove({_id:rq.user.id})
            .then(()=>{
                rs.json({sucess:true})
            })
        })
        .catch(err=>rs.status(404).json(err))
     }
}
module.exports=new ProfileControllers